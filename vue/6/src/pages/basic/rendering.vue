<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1：数组和对象的遍历方式</h2>
					<ul>
						<li class="list-none">列表的数组渲染方式：</li>
						<li v-for="item in maincontent.listRender_arr" :key="item.id">{{ item }}</li>
						<li class="list-none mt-50">表格的对象渲染方式：</li>
					</ul>
					<table class="table table-bordered">
						<thead class="bg-theme text-weight-normal">
							<tr>
								<th>星宿</th>
								<th>头衔</th>
								<th>姓名</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="tr in maincontent.listRender_obj" :key="tr.id">
								<td>{{ tr.star }}</td>
								<td>{{ tr.title }}</td>
								<td>{{ tr.name }}</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：父级信息遍历及键名遍历（如果是数组则是索引）</h2>
					<table class="table table-bordered">
						<thead class="bg-theme text-weight-normal">
							<tr>
								<th>星宿</th>
								<th>头衔</th>
								<th>姓名</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(tr, key) in maincontent.listRender_obj" :key="tr.id">
								<td>{{maincontent.indexString + key + maincontent.starName + tr.star}}</td>
								<td>{{maincontent.indexString + key + maincontent.titleName + tr.title}}</td>
								<td>{{maincontent.indexString + key + maincontent.nameIs + tr.name}}</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3：对象属性访问</h2>
					<table class="table table-bordered">
						<thead class="bg-theme text-weight-normal">
							<tr>
								<th>索引</th>
								<th>键名</th>
								<th>值名</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(value, key, index) in maincontent.roleInfo" :key="index">
								<td>{{index}}</td>
								<td>{{key}}</td>
								<td>{{value}}</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4：模版遍历法</h2>
					<template v-for="food in maincontent.dlInfo">
						<dl :key="food.id">
							<dt>{{food.type}}</dt>
							<dd>{{food.name}}</dd>
						</dl>
					</template>
					<h3 class="section_h3">其实上例也可以这样写（细节请查看本节对应HTML文件）：</h3>
					<dl v-for="food in maincontent.dlInfo" :key="food.id">
						<dt>{{food.type}}</dt>
						<dd>{{food.name}}</dd>
					</dl>
				</section>
				<section id="app-5" style="height:332px;">
					<h2 class="section_h2">#app-5：动态条件渲染</h2>
					<form class="form-group">
						<label class="checkbox-inline" v-for="checkbox in maincontent.hobbyList" :key="checkbox.id">
							<input name="hobby" type="checkbox" :value="checkbox.name" v-model="checkbox.showStatus" :checked="checkbox.showStatus">
							<span>{{checkbox.name}}</span>
						</label>
					</form>
					<ul>
						<li class="list-none">您的爱好是：</li>
						<template v-for="hobby in maincontent.hobbyList">
							<li  v-if="hobby.showStatus" :key="hobby.id">{{hobby.name}}</li>
						</template>
					</ul>
				</section>
				<section id="app-6">
					<h2 class="section_h2">#app-6：逻辑判断渲染</h2>
					<form class="form-group">
						<label class="checkbox-inline" v-for="radio in maincontent.types" :key="radio.id">
							<input name="hobby" type="radio" v-model="maincontent.selectItem" :value="radio" v-if="radio === '萌宠'" checked>
							<input name="hobby" type="radio" v-model="maincontent.selectItem" :value="radio" v-else>
							<span>{{radio}}</span>
						</label>
					</form>
					<div class="album" v-if="maincontent.selectItem === '萌宠'">
						<img :style="maincontent.imgStyle" v-for="url in maincontent.albums.pet" :src="url" :key="url.id"/>
					</div>
					<div class="album" v-else-if="maincontent.selectItem === '风景'">
						<img :style="maincontent.imgStyle" v-for="url in maincontent.albums.scenery" :src="url" :key="url.id"/>
					</div>
					<div class="album"  v-else-if="maincontent.selectItem === '汽车'">
						<img :style="maincontent.imgStyle" v-for="url in maincontent.albums.car" :src="url" :key="url.id"/>
					</div>
					<div class="album" v-else>
						<img :style="maincontent.imgStyle" v-for="url in maincontent.albums.girl" :src="url" :key="url.id"/>
					</div>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	const roleInfo_arr = ['天魁星——及时雨：宋江','天罡星——玉麒麟：卢俊义','天机星——智多星：吴用','天闲星——入云龙：公孙胜','天勇星——大刀：关胜','天雄星——豹子头：林冲','天猛星——霹雳火：秦明'];
	const roleInfo_obj = [
		{ star: '天威星', title: '双鞭', name: '呼延灼'},
		{ star: '天英星', title: '小李广', name: '华荣'},
		{ star: '天贵星', title: '小旋风', name: '柴进'},
		{ star: '天富星', title: '扑天雕', name: '李应'},
		{ star: '天满星', title: '美髯公', name: '朱仝'},
		{ star: '天孤星', title: '花和尚', name: '鲁智深'},
		{ star: '天伤星', title: '行者', name: '武松'},
	];
	export default{
		name:'rendering',
		data(){
			return{
				Title:'Vue渲染方式',
				maincontent:{
					listRender_arr: roleInfo_arr,
					listRender_obj: roleInfo_obj,
					indexString: 'index为：',
					starName: '，星宿：',
					titleName: '，头衔：',
					nameIs: '，姓名：',
					listRender_obj: roleInfo_obj,
					roleInfo: {
						name: '诸葛亮',
						title: '卧龙',
						writings: '《隆中对》、《出师表》、《诫子书》等'
					},
					dlInfo: [
						{ type: '水果', name: '葡萄、荔枝、葡萄' },
						{ type: '肉类', name: '牛肉、羊肉、猪肉' },
						{ type: '谷类', name: '大麦、玉米、水稻' },
						{ type: '饮品', name: '汽水、咖啡、茶' }
					],
					hobbyList: [
						{ name: '编程', showStatus: true },
						{ name: '游戏', showStatus: false },
						{ name: '看书', showStatus: true },
						{ name: '美食', showStatus: false },
						{ name: '运动', showStatus:  true },
						{ name: '电影', showStatus: false },
					],
					selectItem: '萌宠',
					types: ['萌宠','风景','汽车','美女'],
					imgStyle: 'width:30.33333%;height: 160px; margin-left:5px;border-radius: 15px',
					albums: {
						pet: [require('../../assets/album/pet-01.jpg'),require('../../assets/album/pet-02.jpg'),require('../../assets/album/pet-03.jpg')],
						scenery: [require('../../assets/album/scenery-01.jpg'),require('../../assets/album/scenery-02.jpg'),require('../../assets/album/scenery-03.jpg')],
						car: [require('../../assets/album/car-01.jpg'),require('../../assets/album/car-02.jpg'),require('../../assets/album/car-03.jpg')],
						girl: [require('../../assets/album/girl-01.jpg'),require('../../assets/album/girl-02.jpg'),require('../../assets/album/girl-03.jpg')]
					}
				}
			}
		}
	}
</script>
<style scoped>
</style>