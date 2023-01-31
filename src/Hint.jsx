export default function Hint(props) {
  return (
    <div className="Hint">
      {props.hint.map((elem, index) => (
        <div key={index} className={elem}></div>
      ))}
    </div>
  );
}
