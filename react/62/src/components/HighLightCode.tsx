import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { ForwardedRef, forwardRef, useMemo } from 'react';
export interface HighLightCodeProps extends React.HTMLAttributes<HTMLPreElement>{
    code?: string;
    language?: keyof Prism.Languages & string;
}

const HighLightCode = forwardRef(({ code, language = 'css',...rest }: HighLightCodeProps, ref: ForwardedRef<HTMLPreElement>) => {
    const hightLightCode = useMemo(() => {
        if (code) {
            return Prism.highlight(code, Prism.languages[language], language);
        }
        return '';
    }, [code])
    return (
        <>
            <pre className='pre' ref={ref} {...rest }>
                <code dangerouslySetInnerHTML={{ __html: hightLightCode }} />
            </pre>
        </>
    )
})

export default HighLightCode