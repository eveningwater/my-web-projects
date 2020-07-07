<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app">
					<form class="createInfo">
						<div class="form-group">
							<label>序号：</label>
							<input type="text" v-model="maincontent.newRole.id" class="form-control">
						</div>
						<div class="form-group">
							<label>角色名：</label>
							<input type="text" v-model="maincontent.newRole.name" class="form-control">
						</div>
						<div class="form-group">
							<label>系列：</label>
							<select v-model="maincontent.newRole.series" class="form-control">
								<template v-for="value in maincontent.seriesDefined">
									<option v-if="value==='雷'" selected v-html="value" :key="value.id"></option>
									<option v-else v-html="value" :key="value.id"></option>
								</template>
							</select>
						</div>
						<div class="form-group">
							<label>擅长：</label>
							<select v-model="maincontent.newRole.strongPoint" class="form-control">
								<template v-for="value in maincontent.strongPointDefined">
									<option v-if="value==='攻击'" selected v-html="value" :key="value.id"></option>
									<option v-else v-html="value" :key="value.id"></option>
								</template>
							</select>
						</div>
						<div class="text-right">
							<button type="button" class="btn btn-success" @click="createRole">{{buttonName}}</button>
						</div>
					</form>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>序号</th>
								<th>角色名</th>
								<th>系列</th>
								<th>擅长</th>
								<th class="w-164">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(info,index) in maincontent.roleInfo" :key="info.id">
								<td v-html="info.id"></td>
								<td v-html="info.name"></td>
								<td v-html="info.series"></td>
								<td v-html="info.strongPoint"></td>
								<td>
									<button type="button" class="btn btn-warning" @click="editRole(index)">修改</button>
									<button type="button" class="btn btn-danger" @click="deleteRole(index)">删除</button>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="text-right">
						<button type="button" class="btn btn-success" @click="ascending">升序</button>
						<button type="button" class="btn btn-success" @click="descending">降序</button>
					</div>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'base-demo',
		data(){
			return{
				Title:'Vue基础总结练习',
				maincontent:{
					seriesDefined: ['雷','木','水','火','土','光','暗'],
					strongPointDefined: ['攻击','防御','智力','体质','敏捷'],
					newRole: {
						id: 'DS-',
						name: '',
						series: '',
						strongPoint: ''
					},
					roleInfo: [
						{
							id: 'DS-001',
							name: '钢·雷顿兽',
							series: '雷',
							strongPoint: '体质'
						},
						{
							id: 'DS-002',
							name: '噩梦·幽梦兽',
							series: '暗',
							strongPoint: '攻击'
						},
						{
							id: 'DS-003',
							name: '冰·花刺兽',
							series: '木',
							strongPoint: '敏捷'
						},
						{
							id: 'DS-004',
							name: '熔·岩甲兽',
							series: '土',
							strongPoint: '体质'
						}
					]
				},
				buttonName:'创建角色',
				modifyStatus: false,
				operateObjIndex: NaN,
			}
		},
		methods:{
			createRole:function(){
				if(this.modifyStatus === false){	
					this.maincontent.roleInfo.push(this.maincontent.newRole);
				}else{
					this.maincontent.roleInfo.splice(this.operateObjIndex,1,this.maincontent.newRole);
					this.buttonName = "创建角色";
				}
				this.maincontent.newRole = {
					id: 'DS-',
					name: '',
					series: '',
					strongPoint: ''
				};
			},
			deleteRole:function(index){
				this.maincontent.roleInfo.splice(index,1);
			},
			editRole:function(index){
				this.buttonName = "确认修改";
				this.maincontent.newRole = {
					id: this.maincontent.roleInfo[index].id,
					name: this.maincontent.roleInfo[index].name,
					series: this.maincontent.roleInfo[index].series,
					strongPoint: this.maincontent.roleInfo[index].strongPoint
				}
				this.modifyStatus = true;
				this.operateObjIndex = index;
			},
			ascending:function(){
				this.maincontent.roleInfo.sort(function(role1,role2){
					let id_1 = role1.id.replace(/[^\d*]/g,''),
						id_2 = role2.id.replace(/[^\d*]/g,'');
					return id_1 - id_2;
				})
			},
			descending:function(){
				this.maincontent.roleInfo.sort(function(role1,role2){
					let id_1 = role1.id.replace(/[^\d*]/g,''),
						id_2 = role2.id.replace(/[^\d*]/g,'');
					return id_2 - id_1;
				})
			}
		}
	}
</script>
<style scoped>
	.createInfo {
		margin-bottom: 20px;
	}
	table.table th, table.table td {
		font-size: 20px;
	}
	table.table button.btn {
		font-size: 18px;
		padding: 4px 16px;
	}
</style>