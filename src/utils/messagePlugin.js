export default {
    install: (app, options) => {
        app.config.globalProperties.$message = text => {
            return M.toast({ html: text })
        }
    }
}