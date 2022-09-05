export default `
.vt-header{
	width: 100%;
	height: 45px;
	border-bottom: 1px solid #f2f2f2;
}
.vt-lang-panel {
	width: calc(80% - 20px);
	height: 42px;
	top: 0;left: 200px;
}
.vt-lang-panel .vt-li{
	width: 100px;
	height: 45px;
	line-height: 45px;
	text-align: center;
	margin-left: 16px;
	color: #6b6868;
	float: left;
	cursor: pointer;
}
.vt-lang-panel .vt-li:hover,.vt-lang-panel .vt-li:active{
	border-bottom: 1px solid #26a9f3;
	color: #26a9f3;
}
.vt-content{
	width: 100%;
	height: 400px;
	background-color: transparent;
	display: flex;
	justify-content: space-between;
}
.vt-textarea{
	border: 1px solid #dedfdc;
	border-radius: 15px;
	padding: 15px;
	width: 50%;
	height: 100%;
	box-sizing: border-box;
	font-size: 18px;
	resize: none;
	overflow-y: auto;
	overflow-x: hidden;
	display: block;
	margin: 0 10px;
}
.vt-textarea:disabled{
	background-color: #ffffff; 
	color: #989897;
}
::-webkit-input-placeholder {
	font-size: 16px;
	color: #373836;
	font-family: "楷体";
	letter-spacing: 2px;
}
.vt-footer {
	width: 100%;
	height: 45px;
}
.vt-footer .vt-btn {
	width: 60px;
	height: 45px;
	color: #535455;
	font-size: 16px;
	text-align: center;
	line-height: 45px;
	border: none;
	margin-right: 45px;
	float: right;
	background: transparent;
	outline:none;
	cursor: pointer;
}
.vt-footer .vt-btn:hover{
	color: #26a9f3;
	border-bottom: 1px solid #26a9f3;
}
.vt-lang-panel .checked,.vt-footer .vt-btn.checked{
	color:#26a9f3;
	border-bottom: 1px solid #26a9f3;
}
`;