import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { withTranslation } from "react-i18next";

class CatchSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      data:
        props.dataObject.inspection &&
        props.dataObject.inspection.actualCatch &&
        Array.isArray(props.dataObject.inspection.actualCatch)
          ? props.dataObject.inspection.actualCatch
          : [],
    };
  }

  setData(data) {
    this.setState({
      data: data,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.inspection.actualCatch = data;
      this.props.onChange(dataObject);
    }
  }

  setSpeciesdValue = (value, index) => {
    const { data } = this.state;
    data[index].fish = value;
    this.setData(data);
  };

  setCountValue = (value, index) => {
    const { data } = this.state;
    data[index].number = parseInt(value);
    this.setData(data);
  };

  setWeightValue = (value, index) => {
    const { data } = this.state;
    data[index].weight = parseFloat(value);
    this.setData(data);
  };

  setUnitValue = (value, index) => {
    const { data } = this.state;
    data[index].unit = value;
    this.setData(data);
  };

  addNew = (name, value) => {
    const newData = [...this.state.data];
    newData.push({});
    this.setData(newData);
  };

  deleteItem(itemNo) {
    const newData = [...this.state.data];
    newData.splice(itemNo);
    this.setData(newData);
  }

  render() {
    const { data } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column margin-bottom">
        <div className="flex-row justify-between align-baseline">
          <div className="item-name margin-left margin-top">Catch</div>
          <div className="font-16 pointer margin-right" onClick={this.addNew}>
            {`+ ${t("SEARCH.CATCHES")}`}
          </div>
        </div>
        {data.map((item, index) => (
          <section
            className="box-shadow padding white-bg margin-top"
            key={index}
          >
            <div className="flex-row justify-between align-baseline">
              <h3>{` ${t("FILTER.MAIN.CATCH.NAME")} ${index + 1}`}</h3>
              <div className="flex-row justify-between buttons-container">
                <button
                  className="white-btn"
                  onClick={() => this.deleteItem(index)}
                >
                  <Icon>delete_outlined</Icon>
                </button>
                <button className="white-btn">
                  <Icon>attachment</Icon>
                </button>
              </div>
            </div>
            <div className="flex-row justify-between">
              <TextField
                label={t("FILTER.MAIN.CATCH.SPECIES")}
                style={{ width: "49%" }}
                name="species"
                value={item.fish}
                onChange={(e) => this.setSpeciesdValue(e.target.value, index)}
              />
              <TextField
                label={t("FILTER.MAIN.CATCH.COUNT")}
                style={{ width: "19%" }}
                name="number"
                value={item.number}
                onChange={(e) => this.setCountValue(e.target.value, index)}
              />
              <TextField
                label={t("FILTER.MAIN.CATCH.WEIGHT")}
                style={{ width: "19%" }}
                name="weight"
                value={item.weight}
                onChange={(e) => this.setWeightValue(e.target.value, index)}
              />
              <TextField
                label={t("FILTER.MAIN.CATCH.UNITS")}
                style={{ width: "9%" }}
                name="units"
                value={item.unit}
                onChange={(e) => this.setUnitValue(e.target.value, index)}
              />
            </div>
          </section>
        ))}
      </div>
    );
  }
}

export default withTranslation("translation")(CatchSection);
