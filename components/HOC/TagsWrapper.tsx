import React, { useContext } from 'react'
import { authContext } from '@context/AuthContext'

import { TagsContext } from '@context/TagsContext'

type HOCProps = (Gallery: React.FC<any>) => React.FC<any>

const TagsWrapper: HOCProps = (Gallery) => () => {
  const { isAuth } = useContext(authContext)

  return isAuth && (
    <TagsContext>
      <Gallery />
    </TagsContext>
  )
}

export default TagsWrapper