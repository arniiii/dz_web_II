import axios from 'axios';
import React from 'react';

// BEGIN (write your solution here)
export default class Autocomplete extends React.Component {
  state = { term: '', countries: [] };

  change = async (event) => {
    const term = event.target.value;
    this.setState({ term });
    if (term === '') {
      this.setState({ countries: [] });
      return;
    }
    const { data } = await axios.get('/countries', { params: { term } });
    if (this.state.term === term) this.setState({ countries: data });
  };

  render() {
    return (
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="text" className="form-control" placeholder="Enter Country" value={this.state.term} onChange={this.change} />
        </form>
        {this.state.countries.length > 0 && <ul>{this.state.countries.map((country) => <li key={country}>{country}</li>)}</ul>}
      </div>
    );
  }
}
// END
