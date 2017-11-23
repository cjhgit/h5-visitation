console.log('debug')

let $ = window.$

if ($('#section-content').outerHeight() > $('body').outerHeight()) {
    console.log('高')
    $('.section-content').css('top', '0.2rem')
}
$('#back').on('click', () => {
    if (history.length > 1) {
        history.go(-1)
    } else {
        location.href = '/' // TODO
    }
})

// lang
if (location.href.indexOf('/en/') !== -1) {
    $('#lang').attr('href', '/zh')
}
$('#lang').on('click', function (e) {
    e.preventDefault()
    if (location.href.indexOf('/en/') !== -1) {
        location.href = location.href.replace('/en/', '/zh/')
    } else {
        location.href = location.href.replace('/zh/', '/en/')
    }
})

// nav
if (location.href.indexOf('feature') !== -1) {
    $('#nav-feature').addClass('active')
} else if (location.href.indexOf('case') !== -1) {
    $('#nav-case').addClass('active')
} else if (location.href.indexOf('production') !== -1) {
    $('#nav-production').addClass('active')
} else {
    $('#nav-about').addClass('active')
}

let loaded = false

$('#load-more').on('click', (e) => {
    e.preventDefault()

    if (!loaded) {
        loaded = true

        var tplEl = document.getElementById('news-more')
        var tpl = tplEl.innerHTML

        let $li = $(tpl)
        $('#news-list').append($li)
    }

    $('#load-more').hide()
})

function setCookie(name, value, days, domain, path) {
    var expires = ''
    if (days) {
        var d = new Date()
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + d.toGMTString()
    }
    domain = domain ? '; domain=' + domain : ''
    path = '; path=' + (path || '/')
    document.cookie = name + '=' + value + expires + path + domain
}

$('#visit-pc').on('click', () => {
    setCookie('mobile_request', 'full', 0, 'centrizen.com')
})

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?1bc8cd40a1de7cf89cc8ff1bac54ed5f'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
})()