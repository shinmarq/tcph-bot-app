module.exports = (bot, details) => {
    details.forEach(dtl => {
        if(!('trigger_action' in dtl)){
            bot.dialog(dtl.dialog_id, dtl.dialog);
        } else {
            bot.dialog(dtl.dialog_id, dtl.dialog)
            .triggerAction({
                matches: dtl.trigger_action
            });
        }
    });
}