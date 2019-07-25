import React from "react"

class NewTheoryLesson extends React.Component {
    state = {
        text: ""
    };

    render() {
        const { isAddingTheoryLesson, onCancel, onAdd } = this.props;
        const { text } = this.state;

        if(!isAddingTheoryLesson)
        {
            return (
                <React.Fragment/>
            );
        }
        else {
        return (
            <div className="new-theory-lesson">
                <input
                    type="text"
                    className="new-theory-lesson__input"
                    placeholder="Adicionar nova aula teórica"
                    value={text}
                    onChange={event => {
                        this.setState({
                            text: event.target.value
                        });
                    }} />

                <button className="new-theory-lesson__submit" onClick={
                    () => {
                        onCancel();
                        this.setState(
                            {
                                text: ""
                            }
                        );
                    }
                } >Cancelar</button>


                <button className="new-theory-lesson__submit" onClick={
                    () => {
                        onAdd(text);
                        this.setState(
                            {
                                text: ""
                            }
                        );
                    }
                } >Adicionar</button>

            </div>
        );
            }
    }
}

export default NewTheoryLesson