<template>
    <div class="container">
        <div class="M_title">
            <div class="title">
                <img src="@/assets/img/title-logo.png" alt="logo-home">
                <span>每天进步一点点</span>
            </div>
            <div class="des">
                <p>你迈出的步伐不非得很大，只要是在往正确的方向前行即可</p>
            </div>
        </div>
        <div class="M_content">
            <div class="M_left">
                <div class="item first" @click="goToDetail('resume')">
                    <div class="infos">
                        <p class="title">简历页</p>
                        <p class="desc">一个实习时做的静态简历</p>
                    </div>
                    <img class="icon" src="@/assets/img/resume.png" alt="icon for resume">
                </div>
                <div class="item second">
                    <div class="infos">
                        <p class="title">微信小程序</p>
                        <p class="desc">一个查询热映美剧、热映电影的小程序</p>
                    </div>
                    <div class="qrcode">
                        <img src="@/assets/img/miniprogram.png" alt="qrcode for miniprogram">
                    </div>
                    <img class="icon" src="@/assets/img/miniprogram-logo.png" alt="icon for miniprogram">
                </div>
            </div>
            <div class="M_center">
                <div class="item first" @click="goToDetail('blog')">
                    <div class="infos">
                        <p class="title">我的博客</p>
                        <p class="desc">一个基于vue+grunt的单页博客</p>
                    </div>
                    <img class="icon" src="@/assets/img/blog-logo.png" alt="icon for blog">
                </div>
                <div class="second">
                    <div class="item inner-first" @click="goToDetail('weibo')">
                        <div class="infos">
                            <p class="title">微博</p>
                            <p class="desc">一个仅有的粉丝还都是营销号的个人微博</p>
                        </div>
                        <div class="qrcode">
                            <img src="@/assets/img/weibo.png" alt="qrcode for weibo">
                        </div>
                        <img class="icon" src="@/assets/img/weibo-logo.png" alt="icon for weibo">
                    </div>
                    <div class="item inner-second">
                        <div class="infos">
                            <p class="title">微信公众号</p>
                            <p class="desc">一个年更的个人公众号</p>
                        </div>
                        <div class="qrcode">
                            <img src="@/assets/img/public.png" alt="qrcode for public number">
                        </div>
                        <img class="icon" src="@/assets/img/public-logo.png" alt="icon for public number">
                    </div>
                </div>
            </div>
            <div class="M_right">
                <div class="item first" @click="goToDetail('demo')">
                    <div class="infos">
                        <p class="title">demo页</p>
                        <p class="desc">一个没事做的demo的传送门</p>
                    </div>
                    <img class="icon" src="@/assets/img/demo.png" alt="icon for demo">
                </div>
                <div class="item second" @click="goToDetail('start')">
                    <div class="infos">
                        <p class="title">前端入门</p>
                        <p class="desc">一个还能找到的很久以前摸索着学习时的练习过程</p>
                    </div>
                    <img class="icon" src="@/assets/img/start.png" alt="icon for start page">
                </div>
                <div class="item third" @click="goToDetail('github')">
                    <div class="infos">
                        <p class="title">github</p>
                        <p class="desc">一个目前是大自然搬运工的代码库</p>
                    </div>
                    <img class="icon" src="@/assets/img/github.png" alt="icon for github">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        /* eslint-disable */
        goToDetail(type) {
            let url;
            switch (type) {
                case 'resume':
                    url = 'https://resume.feroad.com';
                    break;
                case 'demo':
                    url = 'https://demo.feroad.com';
                    break;
                case 'start':
                    url = 'https://start.feroad.com';
                    break;
                case 'github':
                    url = 'https://github.com/geekzhanglei';
                    break;
                case 'blog':
                    url = 'https://blog.feroad.com';
                    break;
                case 'weibo':
                    url = 'https://weibo.com/u/5671859298';
                    break;
                default:
                    break;
            }
            if (url) {
                window.location.href = url;
            }
        }
    }
};
</script>

<style>
body,
html {
    height: 100%;
    font-size: 10px;
    color: #fff;
    margin: 0;
    padding: 0;
    background-image: url(../assets/img/bg.png);
    background-size: 100% 100%;
    background-color: #1c1c1c;
    background-repeat: no-repeat;
    font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei,
        Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
}
#homepage {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container {
    display: flex;
    flex-direction: column;
}
.M_title {
    flex: 1;
    color: #1db1e9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.M_title .title {
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.M_title .des {
    font-size: 1.6rem;
}
.M_title .title img {
    width: 6rem;
    height: 6rem;
    margin-right: 2rem;
}
.M_content {
    flex: 3;
    display: flex;
}
.M_content .M_left,
.M_content .M_center,
.M_content .M_right {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.M_left .first {
    flex: 1;
    width: 32rem;
    height: 16rem;
    background-image: url(../assets/img/greenbg.jpg);
    background-size: 100% 100%;
}
.M_left .second {
    flex: 2;
    width: 32rem;
    height: 32rem;
    background-color: #8f86ac;
}
.M_center .first {
    flex: 2;
    width: 32rem;
    height: 32rem;
    background-color: #1eb4ea;
}
.M_center .second {
    flex: 1;
    width: 32rem;
    height: 16rem;
    display: flex;
    flex-direction: row;
    margin: 1.5rem;
    position: relative;
}
.M_center .second .inner-first {
    flex: 1;
    width: 16rem;
    height: 16rem;
    margin: 0 1rem 0 0;
    background-color: #e9494b;
}
.M_center .second .inner-second {
    flex: 1;
    width: 16rem;
    height: 16rem;
    margin: 0 0 0 1rem;
    background-color: #46be82;
}
.M_center .second .infos {
    padding: 1rem;
    line-height: 2rem;
}
.M_center .second .title {
    line-height: 1rem;
}
.M_right .first,
.M_right .second,
.M_right .third {
    flex: 1;
    width: 32rem;
}
.M_right .first {
    background-color: #144d88;
}
.M_right .second {
    background-image: url(../assets/img/pinkbg.jpg);
    background-size: 100% 100%;
}
.M_right .third {
    background-color: #2381e3;
}
.item {
    margin: 1.5rem;
    border-radius: 0.8rem;
    position: relative;
    transition: all 0.5s cubic-bezier(0.78, 0.02, 0.2, 1);
    cursor: pointer;
}
.item .infos {
    padding: 2rem;
    line-height: 1.8rem;
}
.item .infos .title {
    font-size: 2.1rem;
    font-weight: bold;
}
.item .infos .desc {
    font-size: 1.6rem;
}
.qrcode {
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.78, 0.02, 0.2, 1);
}
.qrcode img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    border-radius: 0.8rem;
}
.icon {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0.5rem;
    opacity: 0.4;
    transition: all 0.5s cubic-bezier(0.78, 0.02, 0.2, 1);
}
.M_left .first .icon {
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
}
.M_center .first .icon,
.M_left .second .icon {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
@media screen and (max-width: 1028px) {
    html,
    body {
        height: initial;
        background-image: none;
        padding: 1rem;
    }
    .M_content {
        flex-direction: column;
    }
    .M_title .des {
        padding: 0 1rem;
    }
}
/* 效果 */
.item:hover {
    transform: scale(1.08) translateZ(0);
}
.item:hover .qrcode {
    opacity: 1;
}
.M_center .first:hover {
    background-color: #57cbf2;
    color: black;
}
.M_left .second:hover .icon,
.M_center .inner-first:hover .icon,
.M_center .inner-second:hover .icon {
    opacity: 0;
}
.M_left .first:hover .icon,
.M_center .first:hover .icon {
    opacity: 1;
}
.M_left .first:hover .icon {
    content: url(../assets/img/resume-g.png);
    opacity: 0.99;
}
.M_center .first:hover .icon {
    content: url(../assets/img/blog-logo-b.png);
    opacity: 0.99;
}
.M_right .first:hover .icon,
.M_right .second:hover .icon,
.M_right .third:hover .icon {
    opacity: 0.6;
    animation: tada 1s infinite;
}
@keyframes tada {
    0% {
        transform: scale3d(1, 1, 1);
    }
    10%,
    20% {
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }
    30%,
    50%,
    70%,
    90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }
    40%,
    60%,
    80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }
    100% {
        transform: scale3d(1, 1, 1);
    }
}
</style>
