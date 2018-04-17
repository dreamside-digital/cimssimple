import React from 'react';
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/form';
import Link from 'gatsby-link';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import TextInput from '../components/inputs/TextInput';
import EditableTable from '../components/inputs/EditableTable';
import SingleSelect from '../components/inputs/SingleSelect';

import PageTitle from '../components/PageTitle';
import Question from '../components/Question';
import Label from '../components/Label';
import HelpText from '../components/HelpText';
import InputSection from '../components/InputSection';
import CimsInstructions from '../components/CimsInstructions';

import { docketingTableStructure, docketTypeOptions, outputsTableStructure } from '../constants'

class Step3 extends React.Component {
  generateChangeHandler = fieldId => {
    return value => {
      this.props.saveLocalFormData(fieldId, value, this.props.projectId)
    }
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
              <p>Tracking how CO/CD workers spend their time is important to show how much work goes into CO/CD. Docketing allows us to do this and serves as an ongoing narrative for the initiative. The docket created on this tool can be entered into CIMS during a project or after it is complete.</p>
              <p>If you are using the Parent and Child Initiatives function to organize your projects, we suggest day-to-day docketing in the child initiatives for any time spent on that particular project, and only using the parent docket when planning/goal setting for your parent initiative. The time you spend on child initiatives will not be reflected in the docket for the parent initiative, however a report can be generated that shows the total time spent on a set of linked (parent/child) initiatives. </p>
              <p>CIMS requires that you choose a “docket type” (type of activity) for each block of time docketed. The list for these types is VERY long. If time spent on CD-CO projects includes multiple types of activities, we recommend simply selecting Community Development.</p>
            </HelpText>
            <Label small>For each activity, select the docket type from the list provided on CIMS, indicate how much time was spent, and add any details you wish.</Label>
            <EditableTable
              id="docketing"
              handleChange={this.generateChangeHandler('docketing')}
              tableData={this.props.formData['docketing']}
              tableStructure={docketingTableStructure}
            />
            <Label small>Docket Types</Label>
            <SingleSelect
              options={docketTypeOptions}
            />
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
              <p>This is where you can track which deliverables you have completed.</p>
              <p>Next to each of your deliverables, enter the date it was completed, and add any learnings, further plans, or other comments.</p>
            </HelpText>
            <EditableTable
              id="outputs"
              handleChange={this.generateChangeHandler('outputs')}
              tableData={this.props.formData['outputs']}
              tableStructure={outputsTableStructure}
            />
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
      </div>
    )
  }
}

export default Step3
