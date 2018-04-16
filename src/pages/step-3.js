import React from 'react';
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/step3';
import Link from 'gatsby-link';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import TextInput from '../components/inputs/TextInput';
import PageTitle from '../components/PageTitle';
import Question from '../components/Question';
import Label from '../components/Label';
import HelpText from '../components/HelpText';
import InputSection from '../components/InputSection';
import CimsInstructions from '../components/CimsInstructions';

class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLocalFormData()
  }

  generateChangeHandler = (fieldId ) => {
    return (value) => { this.props.saveLocalFormData(fieldId, value)}
  }

  render() {
    return(
      <div className="page-container" style={{padding: '1rem'}}>

        <PageTitle>Step 3 out of 4: Action - Carrying out the project</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor='docketing'>
              1. Docketing (Mandatory)
            </Label>
            <HelpText>
              <p>For each activity, select the docket type from the list provided on CIMS, indicate how much time was spent, and add any details you wish.</p>
            </HelpText>
            <TextInput id='docketing' handleChange={this.generateChangeHandler('docketing')} value={this.props.pageData['docketing']}/>
          </InputSection>
          <CimsInstructions>
            <p>To docket in CIMS:</p>
            <ol>
              <li>In the Initiatives menu, choose Docket.</li>
              <li>Enter the date and amount of time for each block of time spent on this project.</li>
              <li>Enter the date and amount of time for each block of time spent on this project.</li>
              <li>In Details, there is an open field that can hold a large amount of text. This is a good place to keep track of your project as it progresses, detailing events and impressions. You can also cut & paste from the Details section of this form into the Details field in CIMS. We strongly recommend keeping ongoing notes about the initiative in Docket, NOT in the optional Notes function on the front page of Initiatives. Since Docketing is mandatory this reduces the number of different places information is entered.</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='outputs'>
              2. Outputs (Optional)
            </Label>
            <HelpText>
              <p>The Deliverables field in CIMS provides a useful platform to set out timelines and milestones and will come in handy when tracking outputs. Deliverables can be listed during the planning stage, and more can be added as the project progresses.</p>
            </HelpText>
            <TextInput id='outputs' handleChange={this.generateChangeHandler('outputs')} value={this.props.pageData['outputs']}/>
          </InputSection>
          <CimsInstructions>
            <p>To enter Outputs into CIMS:</p>
            <ol>
              <li>In Docket, choose the docket entry for the date on which a Deliverable is completed.</li>
              <li>Select Details.</li>
              <li>Enter the deliverable completed and any details, or cut & paste from this form.</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Grid container justify="space-between">
          <Grid item>
            <Button component={Link} to='/step-2' color="primary" variant="raised">Back</Button>
          </Grid>
          <Grid item>
            <Button component={Link} to='/step-4' color="secondary" variant="raised">On to Step 4</Button>
          </Grid>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    pageData: state.step3
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLocalFormData: (fieldId, value) => {
      dispatch(saveLocalFormData(fieldId, value))
    },
    getLocalFormData: () => {
      dispatch(getLocalFormData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3)
