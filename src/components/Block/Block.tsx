import Button from '@material-ui/core/Button'
import { Post } from '../../model';
import ReactMarkdown from "react-markdown";
import { Wrapper } from './Block.style';
import { Link } from 'react-router-dom';

type Props = {
    post: Post

};

const Item: React.FC<Props> = ({ post }) => (
    <Wrapper>
        <Link to={`/post/${post.post_id}`} style={{ textDecoration: 'none', color:'black' }}>
            <div>
                <h2>{post.title}</h2>
                {post.raw_body.length >= 30 ? (
                    <ReactMarkdown>{post.raw_body.slice(0, 30) + "...."}</ReactMarkdown>
                ) : (
                    <ReactMarkdown>{post.raw_body}</ReactMarkdown>
                )}
            </div>
        </Link>
    </Wrapper>
);

export default Item;
