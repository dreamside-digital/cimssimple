import React from 'react'

const PageContainer = props => {
  const styles = {
    container: {
      marginTop: '64px' // navigation
    }
  }

  return (
    <div style={styles.container}>
      { props.children }
    </div>
  )
}

export default PageContainer