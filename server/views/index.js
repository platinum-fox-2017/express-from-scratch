'use strict'

const express = require('express');

class View {
    static printData(respond, data, table) {
        respond.render('tableView.ejs', {data, table});
    }

    static homePage(respond) {
        respond.render('home.ejs')
    }

    static editView(respond, data, table) {
        respond.render('editView.ejs', {data, table});
    }
}

module.exports = View;