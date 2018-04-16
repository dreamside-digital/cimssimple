import React from 'react';
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/step1';
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

class Step1 extends React.Component {
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

        <PageTitle>Step 1 out of 4: Starting a new project</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor='initiativeName'>1. Initiative Name</Label>
            <TextInput id='initiativeName' handleChange={this.generateChangeHandler('initiativeName')} value={this.props.pageData['initiativeName']}/>
            <HelpText>
              <p>Initiative names should be specific and descriptive, so that they provide a clear idea of your project’s focus and activities, such as “Community Assemblies on Income Security Reform.” </p>
              <p>You may want to adopt a consistent system, called a naming convention, to name all your projects in CIMS. This will allow you to search them more easily. Having a naming convention will increase consistency and clarity, especially when multiple staff work on the same project. A clinic could establish naming conventions that all staff use, to make it even easier to search and group projects in CIMS. For example, you may want to decide whether or not to use abbreviations (such as PLE), and / or a consistent order for names (such as clinic name – type of activity – community and / or topic).</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To start and name a new initiative in CIMS:</p>
            <ol>
              <li>Go to your Dashboard</li>
              <li>Under “Initiatives” click the + sign to add a new Initiative</li>
              <li>From the top menu, choose Initiative Information</li>
              <li>Enter the name in Initiative Name</li>
              <li>Note that mandatory fields in CIMS Initiatives are marked with a red asterisk</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='initiativeType'>
              2a. Initiative Type
            </Label>
            <TextInput id='initiativeType' handleChange={this.generateChangeHandler('initiativeType')} value={this.props.pageData['initiativeType']}/>
            <HelpText>
              <p>Initiative type is a mandatory field in CIMS, but the checklist of types is very long. If you are not sure which category best suits your project, or if it falls into many categories, we recommend selecting Community Development.</p>
            </HelpText>
          </InputSection>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='initiativeSubType'>
              2b. Initiative Sub-type (optional)
            </Label>
            <TextInput id='initiativeSubType' handleChange={this.generateChangeHandler('initiativeSubType')} value={this.props.pageData['initiativeSubType']}/>
            <HelpText>
              <p>Each initiative type has a list of possible sub-types. These are not mandatory – you can choose whether you want to categorize your project in this way. By selecting types and sub-types in CIMS, you make it possible to search CIMS for initiatives of the same type.</p>
            </HelpText>
          </InputSection>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='parentOrChild'>
              3. Is this initiative a parent or a child?
            </Label>
            <TextInput id='parentOrChild' handleChange={this.generateChangeHandler('parentOrChild')} value={this.props.pageData['parentOrChild']}/>
            <HelpText>
              <p>In CIMS, a “parent” initiative is a long-term project or campaign with an overarching goal, while a “child” initiative is a specific action, event, or activity that contributes to the campaign.</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>CO/CD campaigns are often long-term campaigns aiming to create specific social or political change, made up of a series of actions or events. CIMS lets you link specific activities to the ongoing campaigns they are part of – so that you can show all the work that goes into a larger campaign, and the results of that work, even when the campaign is ongoing.</p>
            <p>For example, the parent initiative (overall goal/campaign) may be to form a community-wide tenants’ association, and the child initiatives (actions aiming to achieve that goal) might include conducting outreach to tenants in specific buildings, hosting a community-wide summit, meeting with engaged tenants to create terms of reference and an action plan, and supporting the ongoing work of the association. Each of these activities could be considered its own initiative with its own activities, timelines, objectives, and outcomes.</p>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor='peopleResources'>
              4. People and Resources
            </Label>
            <TextInput id='peopleResources' handleChange={this.generateChangeHandler('peopleResources')} value={this.props.pageData['peopleResources']}/>
            <HelpText>
              <p>Your fellow clinic staff are added as 'resources', and all other contacts are added as ‘partners’.</p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>Assigned to</p>
            <ul>
              <li>This field will self-populate based on whose CIMS profile the initiative is created in. If someone else (such as an administrative staff person) is entering this project into CIMS, it should be done within the CIMS profile of the project's lead. </li>
            </ul>
            <p>Initiative Resources</p>
            <ol>
              <li>From the menu across the top of the Initiative screen, choose Initiative Resources. </li>
              <li>You can add any kind of contact (organization, client, staff member). Your fellow clinic staff are added as 'resources', and all other contacts are added as 'partners'.</li>
            </ol>

          </CimsInstructions>
        </Question>


        <Grid container justify="space-between">
          <Grid item>
            <Button component={Link} to='/' color="primary" variant="raised">Back</Button>
          </Grid>
          <Grid item>
            <Button component={Link} to='/step-2' color="secondary" variant="raised">On to Step 2</Button>
          </Grid>
        </Grid>

      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    pageData: state.step1
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

export default connect(mapStateToProps, mapDispatchToProps)(Step1)
