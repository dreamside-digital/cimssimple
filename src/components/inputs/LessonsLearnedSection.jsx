import React from 'react'
import { find, compact, map } from 'lodash'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import LessonLearned from './LessonLearned'

const LessonsLearnedSection = props => {
  const onChange = (index) => (newData) => {
    const lessons = [...props.lessonsLearned];
    lessons.splice(index, 1, newData)

    props.handleChange(lessons)
  }

  const onDelete = (index) => () => {
    const lessons = [...props.lessonsLearned];
    lessons.splice(index, 1)

    props.handleChange(lessons)
  }

  const createNewLessonLearned = () => {
    const emptyLesson = {
      goal: '',
      contributed: '',
      learned: '',
      unanticipated: '',
      next: ''
    };
    const oldData = props.lessonsLearned ? props.lessonsLearned : [];
    const newData = oldData.concat(emptyLesson);

    props.handleChange(newData)
  }


  const emptyLessonsLearned = map(props.goalsObjectives, ((goal, id) => {
    const exists = find(props.goalsObjectives, ['goal', goal])
    if (!exists) {
      return {
        goal: goal,
        contributed: '',
        learned: '',
        unanticipated: '',
        next: ''
      };
    }
  }))

  const lessonsToEvaluate = props.lessonsLearned.concat(compact(emptyLessonsLearned))

  return (
    <Grid container spacing={16}>
      {
        lessonsToEvaluate.map((lesson, index) => {
          return(
            <Grid item xs={12} key={`lesson-${index}`}>
              <LessonLearned value={lesson} handleChange={onChange(index)} handleDelete={onDelete(index)} />
            </Grid>
          )
        })
      }
      <Button onClick={createNewLessonLearned}>Add Lesson Learned</Button>
    </Grid>
  )
}

export default LessonsLearnedSection
