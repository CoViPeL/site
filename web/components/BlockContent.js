const BlockContent = ({ content, className }) => {
  return <div>{content ? JSON.stringify(content) : null}</div>;
};

export default BlockContent;
