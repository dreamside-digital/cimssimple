import React from 'react'
import { find, compact, map } from 'lodash'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import LessonLearned from './LessonLearned'

class LessonsLearnedSection extends React.Component {
  componentDidMount() {
    this.insertGoalsObjectives()
  }

  insertGoalsObjectives = () => {
    const emptyLessons = map(this.props.goalsObjectives, ((goal, id) => {
      const exists = find(this.props.lessonsLearned, ['goal', goal])
      if (!exists) {
        return {
          goal: goal,
          contributed: '',
          learned: '',
          unanticipated: '',
          next: '',
          allowDelete: false
        };
      }
    }))

    const updatedLessons = [...this.props.lessonsLearned].concat(compact(emptyLessons))

    this.props.handleChange(updatedLessons)
  }

  onChange = (index) => (newData) => {
    const lessons = [...this.props.lessonsLearned];
    lessons.splice(index, 1, newData)

    this.props.handleChange(lessons)
  }

  onDelete = (index) => () => {
    const lessons = [...this.props.lessonsLearned];
    lessons.splice(index, 1)

    this.props.handleChange(lessons)
  }

  createNewLessonLearned = () => {
    const emptyLesson = {
      goal: '',
      contributed: '',
      learned: '',
      unanticipated: '',
      next: '',
      allowDelete: true
    };
    const oldData = this.props.lessonsLearned ? this.props.lessonsLearned : [];
    const newData = oldData.concat(emptyLesson);

    this.props.handleChange(newData)
  }

  render() {
    return (
      <Grid container spacing={16}>
        {
          this.props.lessonsLearned.map((lesson, index) => {
            return(
              <Grid item xs={12} key={`lesson-${index}`}>
                <LessonLearned value={lesson} handleChange={this.onChange(index)} handleDelete={this.onDelete(index)} />
              </Grid>
            )
          })
        }
        <Button onClick={this.createNewLessonLearned}>Add Lesson Learned</Button>
      </Grid>
    )
  }
}

export default LessonsLearnedSection
