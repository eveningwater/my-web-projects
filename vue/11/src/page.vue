<template>
    <div class="page">
        <el-container>
            <el-header class="lh-60">
                <h1 class="title">创翼微码用户满意度调查</h1>
            </el-header>
            <el-main class="el-card max-width-800">
                <el-row>
                    <el-col :span="24" v-for="(item,index) in currentParam" :key="item.question + index">
                        <el-form :label-width="getWidth">
                            <!-- 性别 -->
                            <template v-if="index === 0">
                                <el-form-item :label="item.question">
                                    <el-radio-group @change="selectSex(item)" v-model="sex">
                                        <el-radio v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" :label="radio.answerText"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <!-- 年龄 -->
                            <template v-if="index === 1">
                                <el-form-item :label="item.question">
                                    <el-radio-group @change="selectAge(item)" v-model="age">
                                        <el-radio v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" :label="radio.answerText"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <!-- 职业 -->
                            <template v-if="index === 2">
                                <el-form-item :label="item.question">
                                     <el-radio-group @change="selectProfession(item)" v-model="profession">
                                         <div v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" class="radio-item">
                                             <el-radio  :label="radio.answerText"></el-radio>
                                         </div>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <!-- 收入 -->
                            <template v-if="index === 3">
                                <el-form-item :label="item.question">
                                     <el-radio-group @change="selectIncome(item)" v-model="income">
                                         <div v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" class="radio-item">
                                             <el-radio  :label="radio.answerText"></el-radio>
                                         </div>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <!-- 是否使用过其它类似微码的功能型应用 -->
                            <template v-if="index === 4">
                                <el-form-item :label="item.question">
                                     <el-radio-group @change="selectUseMicrocode(item)" v-model="useMicrocode">
                                         <el-radio v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" :label="radio.answerText"></el-radio>
                                    </el-radio-group>
                                    <el-input v-model="item.answer" placeholder="请输入应用名" v-if="item.selectedIndex[0] === 1"></el-input>
                                </el-form-item>
                            </template>
                            <!-- 微码应用存在问题 -->
                            <template v-if="index === 5">
                                <el-form-item :label="item.question">
                                    <el-checkbox-group @change="selectProblem(item)" v-model="problem" class="display-inline-block">
                                        <div v-for="(checkbox,checkboxIndex) in item.allAnswers" :key="checkbox.answerText + checkboxIndex" class="radio-item">
                                             <el-checkbox :label="checkbox.answerText"></el-checkbox>
                                         </div>
                                    </el-checkbox-group>
                                    <el-input v-model="item.answer" placeholder="请输入问题" v-if="item.selectedIndex.indexOf(5) > -1"></el-input>
                                </el-form-item>
                            </template>
                            <!-- 用户满意程度 -->
                            <template v-if="index === 6">
                                <el-form-item :label="item.question">
                                     <el-radio-group @change="selectSatisfaction(item)" v-model="satisfaction">
                                         <el-radio v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" :label="radio.answerText"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <!-- 新增其它功能 -->
                            <template v-if="index === 7">
                                <el-form-item :label="item.question">
                                     <el-radio-group @change="selectOtherFunction(item)" v-model="otherFunction">
                                         <el-radio v-for="(radio,radioIndex) in item.allAnswers" :key="radio.answerText + radioIndex" :label="radio.answerText"></el-radio>
                                    </el-radio-group>
                                    <el-input v-model="item.answer" placeholder="请输入功能" type="textarea"
                                        :rows="2" v-if="item.selectedIndex[0] === 1"></el-input>
                                </el-form-item>
                            </template>
                        </el-form>
                    </el-col>
                    <el-col :span="24">
                        <div class="text-align-center">
                            <el-button type="primary" class="w-80p" @click="submitAll">提交</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <!-- <el-footer>
                @copy2020 eveningwater
                <el-link type="primary" href="http://www.beian.miit.gov.cn/">蜀ICP备20006940号</el-link>
            </el-footer> -->
        </el-container>
    </div>
</template>
<script src="./_page.js"></script>