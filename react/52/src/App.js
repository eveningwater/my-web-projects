import './App.css';
import React,{ Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "testimonial-box-switcher";
const IMAGE_URL = "https://www.eveningwater.com/my-web-projects/js/105/images/"
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            testimonials:[
                {
                    name: 'Miyah Myles',
                    position: 'Marketing',
                    text:
                        "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
                },
                {
                    name: 'Miyah Myles',
                    position: 'Marketing',
                    text:
                        "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
                },
                {
                    name: 'June Cha',
                    position: 'Software Engineer',
                    text:
                        'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
                },
                {
                    name: 'Iida Niskanen',
                    position: 'Data Entry',
                    text:
                        "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
                },
                {
                    name: 'Renee Sims',
                    position: 'Receptionist',
                    text:
                        "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
                },
                {
                    name: 'Jonathan Nunfiez',
                    position: 'Graphic Designer',
                    text:
                        "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
                },
                {
                    name: 'Sasha Ho',
                    position: 'Accountant',
                    text:
                        'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
                },
                {
                    name: 'Veeti Seppanen',
                    position: 'Director',
                    text:
                        'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
                },
            ],
            current:0
        }
        this.timer = null;
        this.updateTestimonial = this.updateTestimonial.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        setTimeout(() => this.updateTestimonial(),10000);
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    updateTestimonial(){
        let { current,testimonials } = this.state;
        if(current >= testimonials.length - 1){
            current = 0;
        }else{
            current++;
        }
        Promise.resolve().then(() => this.setState({ current }));
        this.timer = setTimeout(this.updateTestimonial,10000)
    }
    render(){
        const { current,testimonials } = this.state;
        return (
            <div className="app">
                <div className="tbs-container">
                    <div className="tbs-progress-bar"></div>
                    <div className="fas fa-quote-right fa-quote tbs-quote"></div>
                    <div className="fas fa-quote-left fa-quote tbs-quote"></div>
                    <p className="tbs-content">{ testimonials[current].text }</p>
                    <div className="tbs-user">
                        <img src={IMAGE_URL + (current + 1) + ".png"} className="tbs-user-avatar" alt="图片加载中"></img>
                        <div className="tbs-user-info">
                            <Title level="4" className="tbs-user-name">{ testimonials[current].name }</Title>
                            <p className="tbs-user-role">{ testimonials[current].position }</p>
                        </div>
                    </div>
                    <div className="tbs-order">
                        The order:
                        <span className="tbs-order-count">{ current + 1 }</span>
                    </div>
                </div>
            </div>
        )
    }
}
