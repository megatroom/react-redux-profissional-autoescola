import React from "react"

class NewStudent extends React.Component {
    state = {
        text: ""
    };

    render() {
        const { onAddStudent } = this.props;
        const { text } = this.state;

        return (
            <div className="new-student">
                <input
                    type="text"
                    className="new-student__input"
                    placeholder="Adicionar novo estudante"
                    value={text}
                    onChange={event => {
                        this.setState({
                            text: event.target.value
                        });
                    }} />

                <button className="new-student__submit" onClick={
                    () => {
                        onAddStudent(text);
                        this.setState(
                            {
                                text: ""
                            }
                        );
                    }
                } >Inserir novo estudante</button>

            </div>
        );
    }
}

export default NewStudent