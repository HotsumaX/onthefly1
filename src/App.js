import React from "react";
import axios from "axios";
import "./App.css";
import { Button } from "grommet";

const API_KEY = "6e630f7b-a0bb-41a9-ac2a-5b195704e848";

const constructApiCallUrl = (line1, line2, imageId) =>
  `http://version1.api.memegenerator.net//Instance_Create?languageCode=en&generatorID=45&imageID=${imageId}&text0=${line1}&text1=${line2}&apiKey=${API_KEY}`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const incrementImageId = ({ imageId }) => ({ imageId: imageId + 1 });
class App extends React.Component {
  state = {
    memeUrl: "",
    line1: "fancy pant",
    line2: "get lap dance",
    imageId: 30
  };

  fetchMemeImage = async () => {
    const {
      data: {
        result: { instanceImageUrl }
      }
    } = await axios.get(
      constructApiCallUrl(
        this.state.line1,
        this.state.line2,
        this.state.imageId
      )
    );
    this.setState({ memeUrl: instanceImageUrl });
  };
  componentDidMount() {
    this.fetchMemeImage();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.fetchMemeImage();
  };
  handleClickNext = () => {
    //notice the difference of the function above and how we declare the state below
    this.setState(incrementImageId, this.fetchMemeImage);
  };
  handleClickPrevious = () => {
    this.setState(
      ({ imageId }) => ({ imageId: imageId - 1 }),
      this.fetchMemeImage
    );
  };

  handleSurpriseMe = () => {
    this.setState({ imageId: getRandomIntInclusive(1, 500) });
    this.fetchMemeImage();
  };

  render = () => (
    <div className="App">
      <header className="App-header">
        <div className="firstDiv">
          <Button
            className="button"
            label="previous"
            onClick={this.handleClickPrevious}
          />
          <img
            src={this.state.memeUrl}
            className="App-logo"
            alt={this.state.memeUrl}
          />
          <Button
            className="button"
            label="next"
            onClick={this.handleClickNext}
          />
        </div>

        <button onClick={this.handleSurpriseMe}>surprise me</button>

        <form>
          <label htmlFor="line1">
            Edit Line One
            <input
              name="line1"
              value={this.state.line1}
              placeholder="line 1"
              onChange={event => this.setState({ line1: event.target.value })}
            />
          </label>
          <br />
          Edit Line Two
          <input
            value={this.state.line2}
            placeholder="line 2"
            onChange={event => this.setState({ line2: event.target.value })}
          />
          <br />
          <button onClick={this.handleSubmit}>submit</button>
        </form>
        <p>the current image number {this.state.imageId}</p>
      </header>
    </div>
  );
}

export default App;
