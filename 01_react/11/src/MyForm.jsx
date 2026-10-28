import React from 'react';

// BEGIN (write your solution here)
export default class MyForm extends React.Component {
  state = {
    submitted: false,
    fields: { email: '', password: '', address: '', city: '', country: '', acceptRules: false },
  };

  change = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({ fields }) => ({ fields: { ...fields, [target.name]: value } }));
  };

  render() {
    const { fields, submitted } = this.state;
    if (submitted) {
      return (
        <div>
          <button type="button" className="btn btn-primary" onClick={() => this.setState({ submitted: false })}>Back</button>
          <table className="table"><tbody>
            {Object.keys(fields).sort().map((name) => (
              <tr key={name}><td>{name}</td><td>{String(fields[name])}</td></tr>
            ))}
          </tbody></table>
        </div>
      );
    }
    return (
      <form name="myForm" onSubmit={(event) => {
        event.preventDefault();
        this.setState({ submitted: true });
      }}>
        {['email', 'password', 'address', 'city'].map((name) => (
          <div className="col-md-6 mb-3" key={name}>
            <label htmlFor={name} className="col-form-label">{name[0].toUpperCase() + name.slice(1)}</label>
            {name === 'address'
              ? <textarea className="form-control" name={name} id={name} placeholder="1234 Main St" value={fields[name]} onChange={this.change} />
              : <input type={name === 'city' ? 'text' : name} name={name} id={name} className="form-control"
                placeholder={name === 'city' ? undefined : name[0].toUpperCase() + name.slice(1)} value={fields[name]} onChange={this.change} />}
          </div>
        ))}
        <div className="col-md-6 mb-3">
          <label htmlFor="country" className="col-form-label">Country</label>
          <select id="country" name="country" className="form-control" value={fields.country} onChange={this.change}>
            <option value="">Choose</option>
            <option value="argentina">Argentina</option><option value="russia">Russia</option><option value="china">China</option>
          </select>
        </div>
        <div className="col-md-6 mb-3"><div className="form-check">
          <label className="form-check-label" htmlFor="rules">
            <input id="rules" type="checkbox" name="acceptRules" className="form-check-input" checked={fields.acceptRules} onChange={this.change} />
            Accept Rules
          </label>
        </div></div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}
// END
