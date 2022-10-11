import Button from '@material-ui/core/Button'
import { Post } from '../../model';
import ReactMarkdown from "react-markdown";
import { Wrapper } from './Block.style';
import { Link } from 'react-router-dom';

type Props = {
    post: Post,
    isFollowerOnly: boolean,
};

const Item: React.FC<Props> = ({ post, isFollowerOnly }) => (
    <Wrapper>

        <Link to={`/post/${post.post_id}`} style={{ textDecoration: 'none', color:'black' }}>
            <div>
                {isFollowerOnly? "⭐":"🌐" }
                <h2>{post.post_title}</h2>
                {post.post_body.length >= 30 ? (
                    <ReactMarkdown>{post.post_body.slice(0, 30) + "...."}</ReactMarkdown>
                ) : (
                    <ReactMarkdown>{post.post_body}</ReactMarkdown>
                )}
            </div>
        </Link>
    </Wrapper>

);

export default Item;
