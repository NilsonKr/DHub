import React, { useContext } from 'react'
import { authContext } from '@context/AuthContext'

import { TagsContext } from '@context/TagsContext'

type HOCProps = (Component: React.FC<any>) => React.FC<any>

const TagsWrapper: HOCProps = (Component) => () => {
  const { isAuth, isItemShared } = useContext(authContext)

  return (isAuth || isItemShared) && (
    <TagsContext isItemShared={isItemShared} >
      <Component />
    </TagsContext>
  )
}

export default TagsWrapper