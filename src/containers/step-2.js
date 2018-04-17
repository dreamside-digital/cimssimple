import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4';
import { map } from 'lodash';

import { saveLocalFormData, getLocalFormData } from '../redux/modules/form'

import Link from 'gatsby-link'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'

import TextInput from '../components/inputs/TextInput'
import TextInputToList from '../components/inputs/TextInputToList'
import MultiSelect from '../components/inputs/MultiSelect'
import BasicTable from '../components/inputs/BasicTable'

import PageTitle from '../components/PageTitle'
import Question from '../components/Question'
import Label from '../components/Label'
import HelpText from '../components/HelpText'
import InputSection from '../components/InputSection'
import CimsInstructions from '../components/CimsInstructions'

import {
  increasedAbilityOptions,
  increasedKnowledgeOptions,
  longTermOutcomesOptions,
  deliverablesTableHeaders,
} from '../constants'

class Step2 extends React.Component {
  generateChangeHandler = fieldId => {
    return value => {
      this.props.saveLocalFormData(fieldId, value, this.props.projectId)
    }
  }

  render() {
    return (
      <div className="page-container" style={{ padding: '1rem' }}>
        <PageTitle>Step 2 out of 4: Planning the project</PageTitle>

        <Question>
          <InputSection>
            <Label htmlFor="goalsObjectives">
              1. What are this project’s Goals & Objectives? (Mandatory)
            </Label>
            <HelpText>
              <p>
                The Goals and Objectives section in CIMS does not track the
                goals and objectives of the initiative, but rather how the
                initiative fits in with the goals and objectives of your clinic.
                Linking your CO/CD work to your clinic’s goals and objectives is
                important way to demonstrate that you are helping your clinic
                achieve the goals they were funded for. The clinic will use this
                section to generate reports and performance measures on CD-CO
                work.
              </p>
              <p>
                The goals & objectives for initiatives in CIMS must be selected
                from the clinic’s Goals & Objectives entered by the clinic E.D.
                OPICCO is urging clinics to use three consistent Goals &
                Objectives, based on ACLCO’s recommended Performance Measures
                for CD-CO work:
              </p>
              <ol>
                <li>Promote access to justice in our community</li>
                <li>
                  Confront legislative and policy decisions that regulate the
                  lives of low-income people
                </li>
                <li>Nurture community empowerment</li>
              </ol>
            </HelpText>
            <Label small>Goals and Objectives:</Label>
            <TextInputToList
              fieldId='goalsObjectives'
              list={this.props.formData['goalsObjectives']}
              handleUpdateList={this.generateChangeHandler('goalsObjectives')}
            />
          </InputSection>
          <CimsInstructions>
            <p>To select Goals & Objectives for your project in CIMS:</p>
            <ol>
              <li>Under ‘Goals and Objectives’ click the plus sign.</li>
              <li>
                Under the ‘Goals and Objectives’ drop down menu, click the
                search button (magnifying glass) or select ‘look up more
                records’ and select the goal/objective that best fits with the
                work you are doing.
              </li>
              <li>Save.</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="deliverables">
              2. What are your project’s deliverables? (Optional)
            </Label>
            <HelpText>
              <p>
                The Deliverables field in CIMS provides a useful platform to set
                out timelines and milestones and will come in handy when
                tracking outputs. Deliverables can be listed during the planning
                stage, and more can be added as the project progresses.
              </p>
            </HelpText>
            <BasicTable
              id="deliverables"
              handleChange={this.generateChangeHandler('deliverables')}
              tableData={this.props.formData['deliverables']}
              tableHeaders={deliverablesTableHeaders}
            />
          </InputSection>
          <CimsInstructions>
            <p>To enter Deliverables in CIMS:</p>
            <ol>
              <li>Go to Initiative Deliverables & Risks</li>
              <li>Under Initiative Deliverables, choose the plus sign</li>
              <li>
                Enter your deliverables into the open field, or cut & paste from
                this document
              </li>
              <li>Save</li>
            </ol>
          </CimsInstructions>
        </Question>

        <Question>
          <InputSection>
            <Label htmlFor="anticipatedOutcomes">
              3. Anticipated outcomes (Mandatory)
            </Label>
            <HelpText>
              <p>
                Identifying the outcomes you are aiming for can help you assess
                the success of your project. CD-CO projects might be aiming for
                outcomes in three main areas:
              </p>
              <ul>
                <li>
                  Process outcomes: What are we trying to achieve through the
                  way in which we carry out the project? (e.g. project meetings
                  reflect the diversity of the community)
                </li>
                <li>
                  Community outcomes: What changes does the project promote
                  among stakeholders, partners, and participants? (e.g. the
                  project aims to improve participants’ public-speaking skills)
                </li>
                <li>
                  Results-focused outcomes: What are the systemic or structural
                  changes, both big and small, that the project is trying to
                  achieve? (e.g. getting media attention for an issue, changing
                  a policy)
                </li>
              </ul>
              <p>
                CIMS includes some checklists of potential project outcomes (see
                below), as well as some open fields for defining your own
                outcomes.
              </p>
            </HelpText>
            <Label small>
              What outcomes is your project aiming for? These can be both
              short-term and long-term. Select appropriate items from the CIMS
              list below, and add your own. Also indicate whose knowledge /
              ability the project is aiming to increase (e.g. clinic staff,
              community members, tenants, etc.)
            </Label>
            <Label small>Increased Ability</Label>
            <MultiSelect
              id="anticipatedOutcomesAbility"
              handleChange={this.generateChangeHandler('anticipatedOutcomesAbility')}
              selected={this.props.formData['anticipatedOutcomesAbility'] || []}
              options={increasedAbilityOptions}
            />
            <Label small>Increased Knowledge</Label>
            <MultiSelect
              id="anticipatedOutcomesKnowledge"
              handleChange={this.generateChangeHandler('anticipatedOutcomesKnowledge')}
              selected={this.props.formData['anticipatedOutcomesKnowledge'] || []}
              options={increasedKnowledgeOptions}
            />
            <Label small>Long Term Outcomes</Label>
            <MultiSelect
              id="anticipatedOutcomesLongTerm"
              handleChange={this.generateChangeHandler('anticipatedOutcomesLongTerm')}
              selected={this.props.formData['anticipatedOutcomesLongTerm'] || []}
              options={longTermOutcomesOptions}
            />
            <Label small>Other</Label>
            <TextInputToList
              fieldId='anticipatedOutcomesOther'
              list={this.props.formData['anticipatedOutcomesOther']}
              handleUpdateList={this.generateChangeHandler('anticipatedOutcomesOther')}
            />
            <HelpText>
              <p>
                These can be both short-term and long-term. Select appropriate
                items from the CIMS list below, and add your own. Also indicate
                whose knowledge / ability the project is aiming to increase
                (e.g. clinic staff, community members, tenants, etc.)
              </p>
            </HelpText>
          </InputSection>
          <CimsInstructions>
            <p>To enter Anticipated Outcomes in CIMS:</p>
            <ol>
              <li>Go to Initiative Deliverables & Risks</li>
              <li>
                In the box next to Anticipated Outcomes, enter your outcomes
                into the open field, or cut & paste from this document.
              </li>
              <li>Save</li>
            </ol>
          </CimsInstructions>
        </Question>
      </div>
    )
  }
}

export default Step2
