import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      change: {
        total: 0,
        dollars: {
          twenties: 0,
          tens: 0,
          fives: 0,
          ones: 0
        },
        cents: {
          quarters: 0,
          dimes: 0,
          nickels: 0,
          pennies: 0
        }
      },
      alert: {
        visibility: 'hidden',
        className: '',
        text: '',
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }

  calculateChange(rec, due) {
    let change = {
      total: 0,
      dollars: {
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0
      },
      cents: {
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
      }
    };
    let amt = change.total = parseFloat(rec - due).toFixed(2);
    while (amt > 0) {
      if (amt >= 20) {
        amt -= 20;
        change.dollars.twenties++;
      }
      else if (amt >= 10) {
        amt -= 10;
        change.dollars.tens++;
      }
      else if (amt >= 5) {
        amt -= 5;
        change.dollars.fives++;
      }
      else if (amt >= 1) {
        amt -= 1;
        change.dollars.ones++;
      }
      else if (amt >= 0.25) {
        amt -= 0.25;
        amt = amt.toFixed(2);
        change.cents.quarters++;
      }
      else if (amt >= 0.10) {
        amt -= 0.10;
        amt = amt.toFixed(2);
        change.cents.dimes++;
      }
      else if (amt >= 0.05) {
        amt -= 0.05;
        change.cents.nickels++;
      }
      else if (amt >= 0.01) {
        change.cents.pennies++;
        amt -= 0.01;
      }
      else if (amt < 0.01 && amt >= 0.005) {
        change.cents.pennies++;
        amt = 0;
      }
      else {
        amt = 0;
        break;
      }
    }
    const newState = {
      change: change
    }
    this.setState(newState);
  }

  setAlert(rec, due) {
    var alert = {
      visibility: 'hidden',
      className: 'alert alert-success mt-3',
      text: '',
    };
    var amt = Math.abs(rec - due).toFixed(2);
    if (rec > due) {
      alert.visibility = 'visible';
      alert.className = 'alert alert-success mt-3';
      alert.text = 'The total change due is $' + amt;
    }
    else {
      alert.visibility = 'visible';
      alert.className = 'alert alert-danger mt-3';
      alert.text = 'Additional money owed: $' + amt;
    }
    this.setState({ alert: alert })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick(e) { // Good
    e.preventDefault();
    var rec = parseFloat(this.state.amountReceived);
    var due = parseFloat(this.state.amountDue);
    this.setAlert(rec, due);
    this.calculateChange(rec, due);
  }

  render() {
    let alert = this.state.alert;
    let visibility = alert.visibility;
    let alertClass = alert.className;
    let text = alert.text;
    let change = this.state.change;
    var styles = {
      alert: {
        textAlign: 'center',
        visibility: 'hidden',
      },
      card: {
        backgroundColor: 'rgb(246, 245, 245)'
      },
      info: {
        marginBottom: '0.2rem',
        marginTop: '0.4rem',
        marginLeft: '0.3rem',
        fontWeight: 'bold',
      },
    }
    return (
      <div className='container-fluid p-2 m-3'>
        <h2 className='h2 page-header' style={{ color: 'white' }}>Change Calculator<hr style={{ borderColor: 'white' }} /></h2>

        <div className='row'>

          <div className='col-sm-4'>

            <div className='card pr-3'>
              <div className='card-header'>Enter Information</div>
              <div className='form-group p-3'>
                <label className='p-1'><strong>How much is due?</strong></label>
                <input name='amountDue' className='form-control' type='number' value={this.state.amountDue} onChange={this.handleChange} />
                <label className='p-1'><strong>How much was received?</strong></label>
                <input name='amountReceived' className='form-control' type='number' value={this.state.amountReceived} onChange={this.handleChange} />
              </div>
              <div className='card-footer'>
                <button name='btn' type='submit' className='btn btn-primary btn-block' onClick={this.handleClick}>Calculate</button>
              </div>
            </div>

          </div>

          <div className='col-sm-8 p-2' style={{ backgroundColor: '#fff' }}>

            <div style={{ visibility: visibility, textAlign: 'center' }} className={alertClass} role='alert'>{text}</div>

            <div className='row p-2'>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Twenties</strong></div>
                    <p className='card-text change'>{change.dollars.twenties}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Tens</strong></div>
                    <p className='change card-text'>{change.dollars.tens}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Fives</strong></div>
                    <p className='card-text change'>{change.dollars.fives}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Ones</strong></div>
                    <p className='card-text change'>{change.dollars.ones}</p>
                  </div>
                </div>
              </div>

            </div>

            <div className='row p-2'>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title' htmlFor='quarters'><strong>Quarters</strong></div>
                    <p name='quarters' className='card-text change'>{change.cents.quarters}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Dimes</strong></div>
                    <p name='dimes' className='card-text change'>{change.cents.dimes}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Nickels</strong></div>
                    <p name='nickels' className='card-text change'>{change.cents.nickels}</p>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card text-center py-2 px-1 w=75' style={styles.card}>
                  <div className='card-body'>
                    <div className='card-title'><strong>Pennies</strong></div>
                    <p name='pennies' className='card-text change'>{change.cents.pennies}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
