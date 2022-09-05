/* eslint-disable no-useless-escape */
export default `.vt-header{
	width: 100%;
	min-height: 45px;
}
.vt-more{
	position: absolute;
	top: 1px;
	right: 5px;
	font-size: 40px;
	color: #26a9f3;
	cursor: pointer;
}
.vt-lang-panel{
	width: 100%;
	position:static;
}
.vt-li{
	width: 100%;
	text-align: center;
	color: #6b6868;
	font-size: 25px;
	cursor: pointer;
}
.vt-li:hover,.vt-li:active{
	color: #26a9f3;
}
.vt-content{
	width: 100%;
	background-color: transparent;
}
.vt-textarea{
	border: 1px solid #ccc;
	display: inline-block;
	width: 100%;
	height: 200px;
	font-size: 18px;
	resize: none;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 15px;
	margin: 10px 0;
	border-radius: 15px;
}
.vt-textarea:disabled{
	background-color: #ffffff; 
	color: #989897;
}
.vt-footer {
	width: 100%;
	height: 45px;
}
.vt-btn{
	width: calc(50% - 2px);
	height: 45px;
	color: #535455;
	float: left;
	font-size: 16px;
	text-align: center;
	line-height: 45px;
	border: none;
	background: transparent;
	outline:none;
	cursor: pointer;
}
.vt-btn:hover{
	color: #26a9f3;
	border-bottom: 1px solid #26a9f3;
}
.vt-lang-panel .checked,.vt-btn.checked{
	color:#26a9f3;
	border-bottom: 1px solid #26a9f3;
}
.vt-iconfont {
	font-family:"iconfont" !important;
	font-style:normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.vt-menu:before { content: "\\e693"; }
`;