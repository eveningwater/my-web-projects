<script lang="tsx">
    import { defineAsyncComponent, defineComponent } from "@vue/runtime-core";
    export default defineComponent({
        setup(){
            const AsyncTitleComponent = defineAsyncComponent(() => import("./Title"));
            const children = [
                {
                    type:"text",
                    value:"",
                    required:true,
                    label:"email"
                },
                {
                    type:"password",
                    value:"",
                    required:true,
                    label:"password"
                },
                {
                    type:"button",
                    text:"login",
                    class:"fw-btn"
                },
                {
                    type:"link",
                    text:"register",
                    class:"fw-link",
                    defaultText:"Don't have an account?"
                }
            ];
            interface ChildType {
                type:string;
                value?:string;
                required?:boolean;
                label?:string;
                text?:string;
                class?:string;
                defaultText?:string;
            }
            const renderChildByType = (child:ChildType) => {
                if(child.label){
                    return (
                        <>
                            <input type={child.type} class="fw-input" required={child.required} v-model={child.value}/>
                            <label class="fw-label">
                                {
                                    child.label.split("").map((lab:string,index:number) => (
                                        <span 
                                            key={ lab + index } 
                                            class="fw-label-span" 
                                            style={{ transitionDelay:50 * index + 'ms'}}
                                        >{lab}</span>
                                    ))
                                }
                            </label>
                        </>
                    )
                }else if(child.defaultText){
                    return (
                        <>
                            {child.defaultText}
                            <a href="/" target="_blank" rel="noopener noreferrer" class={child.class}>{ child.text }</a>
                        </>
                    )
                }else {
                    return (
                        <button type={ child.type as 'button' } class={child.class}>{ child.text }</button>
                    )
                }
            }
            return () => (
                <form class="fw-form">
                    <AsyncTitleComponent class="fw-form-title">please login</AsyncTitleComponent>
                    {
                        children.map((child,index) => (
                            <div class="fw-form-control" key={child.type + index}>
                                { renderChildByType(child) }
                            </div>
                        ))
                    }
                </form>
            )
        }
    });
</script>
<style lang="less" scoped>
    @import "../style/variable.less";
    .fw-form {
        .tran-btn {
            transition: all unit(pi() - 1.2,ms) cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .fw-form-title {
            color:@color;
            margin-bottom: unit(@full * 3 * 10,px);
            text-align: extract(@align,@full * 2);
            text-transform: extract(@text-transform,@full);
            font-size: unit(@full * 20 + 6,px);
            letter-spacing: unit(@full * 2,px);
        }
        .fw-form-control {
            position: extract(@position,length(@position));
            width: unit(@full * 3 * 100 + @full * 5 * 10,px);
            margin: unit(floor(28.1),px) round(0.1);
            color:@color;
            font-size: unit(@full * 10 + 5,px);
            .fw-input {
                width: percentage(@full);
                background-color: @transparent;
                padding: unit(ceil(14.1),px) sqrt(0);
                border: none;
                border-bottom: abs(-4px) solid fade(@color,95%);
                color:@color;
                font-size: unit(@full * 10 + 8,px);
                &:focus-visible {
                    outline:none;
                }
                &:focus,
                &:valid {
                    border-color:@activeColor;
                    color:@activeColor;
                    & + .fw-label .fw-label-span,
                    & + .fw-label .fw-label-span {
                        transform: translateY(unit(-34,px));
                        color:@activeColor;
                    }
                }
            }
            .fw-label {
                color:@color;
                position: extract(@position,@full);
                left: sqrt(0);
                top: unit(@full * 10 + @full * 4 + mod(26,5),px);
                .fw-label-span {
                    display: inline-block;
                    font-size: unit(sqrt(484),px);
                    min-width: unit(ceil(4.3),px);
                    transition: all unit(pi() - 3 + 0.2,ms) cubic-bezier(0.075, 0.82, 0.165, 1);
                    letter-spacing: unit(sqrt(4),px);
                }
            }
            .fw-btn {
                @rotate:@full * 100 + @full * 30 + @full * 5;
                width: percentage(@full);
                color:@color;
                text-transform: extract(@text-transform,length(@text-transform));
                padding: range(16px,18px,2);
                border-radius: unit(@full * 5,px);
                display: inline-block;
                border: unit(sqrt(1),px) solid @btnBgColor-2;
                background: linear-gradient(unit(@rotate,deg),@btnBgColor-1 10%,@btnBgColor-2 90%);
                cursor: pointer;
                font-size: unit(round(17.6),px);
                .tran-btn();
                &:focus-visible {
                    outline: none;
                }
                &:hover {
                    background: linear-gradient(unit(@rotate,deg),@btnBgColor-2 10%,@btnBgColor-1 90%);
                    border-color:@btnBgColor-1;
                }
            }
            .fw-link {
                text-decoration: none;
                font-size: unit(@full * 2 * 10,px);
                text-transform: extract(@text-transform,length(@text-transform));
                color:@btnBgColor-2;
                margin: range(4px,8px,2);
                .tran-btn();
                &:hover {
                    color:@btnBgColor-1;
                }
            }
        }
    }
</style>