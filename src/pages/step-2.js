import React from 'react';
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/step2';
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

class Step2 extends React.Component {
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

        <PageTitle>Step 2 out of 4: Planning the project</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor='goalsObjectives'>
              1. What are this project’s Goals & Objectives?
            </Label>
            <HelpText>
              <p>The Goals and Objectives section in CIMS does not track the goals and objectives of the initiative, but rather how the initiative fits in with the goals and objectives of your clinic. Linking your CO/CD work to your clinic’s goals and objectives is important way to demonstrate that you are helping your clinic achieve the goals they were funded for. The clinic will use this section to generate reports and performance measures on CD-CO work.</p>
            </HelpText>
            <TextInput id='goalsObjectives' handleChange={this.generateChangeHandler('goalsObjectives')} value={this.props.pageData['goalsObjectives']}/>
          </InputSection>
          <CimsInstructions>
            <p>To select Goals & Objectives for your project in CIMS:</p>
            <ol>
              <li>Under ‘Goals and Objectives’ click the plus sign.</li>
              <li>Under the ‘Goals and Objectives’ drop down menu, click the search button (magnifying glass) or select ‘look up more records’ and select the goal/objective that best fits with the work you are doing.</li>
              <li>Save.</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='deliverables'>
              2. What are your project’s deliverables? (Optional)
            </Label>
            <TextInput id='deliverables' handleChange={this.generateChangeHandler('deliverables')} value={this.props.pageData['deliverables']}/>
            <HelpText>
              <p>The Deliverables field in CIMS provides a useful platform to set out timelines and milestones and will come in handy when tracking outputs. Deliverables can be listed during the planning stage, and more can be added as the project progresses.</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To enter Deliverables in CIMS:</p>
            <ol>
              <li>Go to Initiative Deliverables & Risks</li>
              <li>Under Initiative Deliverables, choose the plus sign</li>
              <li>Enter your deliverables into the open field, or cut & paste from this document</li>
              <li>Save</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='anticipatedOutcomes'>
              3. Anticipated outcomes (Mandatory)
            </Label>
            <TextInput id='anticipatedOutcomes' handleChange={this.generateChangeHandler('anticipatedOutcomes')} value={this.props.pageData['anticipatedOutcomes']}/>
            <HelpText>
              <p>These can be both short-term and long-term. Select appropriate items from the CIMS list below, and add your own. Also indicate whose knowledge / ability the project is aiming to increase (e.g. clinic staff, community members, tenants, etc.)</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To enter Anticipated Outcomes in CIMS:</p>
            <ol>
              <li>Go to Initiative Deliverables & Risks</li>
              <li>In the box next to Anticipated Outcomes, enter your outcomes into the open field, or cut & paste from this document.</li>
              <li>Save</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Grid container justify="space-between">
          <Grid item>
            <Button component={Link} to='/step-1' color="primary" variant="raised">Back</Button>
          </Grid>
          <Grid item>
            <Button component={Link} to='/step-3' color="secondary" variant="raised">On to Step 3</Button>
          </Grid>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    pageData: state.step2
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

export default connect(mapStateToProps, mapDispatchToProps)(Step2)
