// @flow
import React from 'react'
import Database from '../Database'
import { Provider } from './DatabaseContext'

export type Props = {
  database: Database,
  children: React$Node,
}

/**
 * Database provider to create the database context
 * to allow child components to consume the database without prop drilling
 */
function DatabaseProvider({ children, database }: Props): React$Element<typeof Provider> {
  // Check for Database instance using multiple methods to avoid module resolution issues
  // Users may import Database via named exports or default exports, which can cause
  // instanceof checks to fail even though it's the same class
  const isValidDatabase =
    database instanceof Database ||
    (database && database._isWatermelonDBDatabase === true) ||
    (database && typeof database.get === 'function' && typeof database.write === 'function')

  if (!isValidDatabase) {
    throw new Error('You must supply a valid database prop to the DatabaseProvider')
  }
  return <Provider value={database}>{children}</Provider>
}

export default DatabaseProvider
