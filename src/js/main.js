import materialize from 'materialize-css'
import '../../src/scss/styles.scss'
import * as Ui from '../../src/js/ui'
import blog from '../../src/js/blog'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(register => {
            console.log('register')
        })
        .catch(error => {
            console.log(error)
        })
}