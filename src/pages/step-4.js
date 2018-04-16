import React from 'react';
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/step4';
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

class Step4 extends React.Component {
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

        <PageTitle>Step 4 out of 4: Reflection</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor='initiativeOutcomes'>
              1. Initiative Outcomes (Mandatory)
            </Label>
            <HelpText>
              <p>Once the project is complete, take some time to reflect on it. What did your project achieve, and how? Try to get input from others involved in the project – clinic staff, partners, and community members. This information will be included in the clinic’s performance measurement of CD-CO work.</p>
            </HelpText>
            <TextInput id='initiativeOutcomes' handleChange={this.generateChangeHandler('initiativeOutcomes')} value={this.props.pageData['initiativeOutcomes']}/>
            <HelpText>
              <p>This section shows the anticipated outcomes you identified at the beginning of the project. Assess each outcome – What did you aim for? Was it achieved? How do you know? Were there any unanticipated outcomes?</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To enter Initiative Outcomes in CIMS:</p>
            <ol>
              <li>Go to Initiative Outcomes</li>
              <li>Click the + sign to open Initiative Outcome Information</li>
              <li>Under Impact Information, check off your outcomes on the drop-down lists under “Increased Ability,” “Increased Knowledge,” and “Long Term Outcomes.” Note that CIMS only permits you to select one item in each of these lists.</li>
              <li>A Details box is available for each outcome – enter your assessment there, or cut & paste from this document. Any additional outcomes that could not be checked on the lists can be added here as well.</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='lessonsLearned'>
              2. Lessons learned (Mandatory)
            </Label>
            <HelpText>
              <p>Consider how this project has contributed to the longer-term goals and impacts the clinic is aiming for. What have you learned? Were there any unanticipated outcomes? What comes next? This information will be included in the clinic’s performance measurement of CD-CO work.listed during the planning stage, and more can be added as the project progresses.</p>
            </HelpText>
            <TextInput id='lessonsLearned' handleChange={this.generateChangeHandler('lessonsLearned')} value={this.props.pageData['lessonsLearned']}/>
          </InputSection>
          <CimsInstructions>
            <p>In CIMS, there are three fields available for project evaluation. You can cut & paste text from this document into these fields:</p>
            <ol>
              <li>Open Initiative Outcome Information</li>
              <li>Value Added: How has this project contributed to the clinic’s achievement of its big picture goals?</li>
              <li>Lessons Learned: What have you learned through this project that will be useful in the future? Were there any unanticipated outcomes?</li>
              <li>Next Steps: What comes next?</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Grid container justify="space-between">
          <Grid item>
            <Button component={Link} to='/step-3' color="primary" variant="raised">Back</Button>
          </Grid>
          <Grid item>
            <Button component={Link} to='/' color="secondary" variant="raised">All done!</Button>
          </Grid>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    pageData: state.step4
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

export default connect(mapStateToProps, mapDispatchToProps)(Step4)
