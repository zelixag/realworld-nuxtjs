const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['notAuth'] = require('../middleware/notAuth.js')
middleware['notAuth'] = middleware['notAuth'].default || middleware['notAuth']

export default middleware
