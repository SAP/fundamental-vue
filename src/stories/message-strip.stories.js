import storiesFor from '../util/stories-for'

const stories = storiesFor('message-strip')

export default { title: 'Message Strip' }

export const defaultMessageStrip = stories('default')
export const customized = stories('customized')
export const dismiss = stories('dismiss')
export const error = stories('error')
export const information = stories('information')
export const success = stories('success')
export const warning = stories('warning')
