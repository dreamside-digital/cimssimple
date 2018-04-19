import React from 'react'
import { find, compact, map } from 'lodash'

import EditableTable from './EditableTable'

class OutputsTable extends React.Component {
  componentDidMount() {
    this.insertDeliverables()
  }

  insertDeliverables = () => {
    const emptyDeliverables = map(this.props.deliverables, ((deliverable, id) => {
      const exists = find(this.props.outputs, ['deliverable', deliverable.deliverable])
      if (!exists) {
        return {
          deliverable: deliverable.deliverable,
          targetDate: deliverable.targetDate,
          dateCompleted: '',
          comments: '',
          allowDelete: false
        };
      }
    }))

    const updatedOutputs = [...this.props.outputs].concat(compact(emptyDeliverables))

    this.props.handleChange(updatedOutputs)
  }

  render() {
    return (
      <EditableTable
        id="outputs"
        handleChange={this.props.handleChange}
        tableData={this.props.outputs}
        tableStructure={this.props.tableStructure}
      />
    )
  }
}

export default OutputsTable
