const Tag = (props: { text: string; textColor: string; bgColor: string }) => {
  
    const { text, textColor, bgColor } = props;

  return (
    <div
      style={{
        color: textColor,
        backgroundColor: bgColor,
        padding: "6px 12px",
        alignItems: "center",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: 400,
        display: "inline-block",
      }}
    >
      {text}
    </div>
  );
};

export default Tag;