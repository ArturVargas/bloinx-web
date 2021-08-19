import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";

import styles from "./RoundCard.module.scss";
import Stepper from "../../components/Stepper";

export default function RoundCard({
  contractKey,
  groupSize,
  turn,
  linkTo,
  toPay,
  disabled,
  buttonText,
  positionToWithdrawPay,
  loading,
  buttonDisabled,
}) {
  const handleGetSteps = () => {
    const indents = [];
    for (let i = 1; i <= groupSize; i += 1) {
      indents.push({ turn: i });
    }
    return indents;
  };

  return (
    <div className={styles.RoundCard}>
      <Link to={linkTo}>
        <div className={styles.RoundCardHeader}>
          <div className={styles.RoundCardTitle}>Mi tanda</div>
          <div className={styles.RoundCardKeys}>{contractKey}</div>
        </div>
        <Stepper
          current={turn}
          steps={handleGetSteps()}
          turnWithDraw={positionToWithdrawPay}
        />
        <div className={styles.RoundCardDescription} />
      </Link>
      <div className={styles.RoundCardFooter}>
        <div className={styles.RoundCardTitleFooter}>{`Ronda ${turn}`}</div>
        <Button
          loading={loading}
          className={styles.RoundCardAction}
          type="primary"
          disabled={disabled || loading}
          onClick={!buttonDisabled ? toPay : () => {}}
        >
          {!buttonDisabled ? buttonText : "Finalizado"}
        </Button>
      </div>
    </div>
  );
}

RoundCard.defaultProps = {
  linkTo: "",
  buttonText: "",
  toPay: () => {},
  disabled: false,
  positionToWithdrawPay: 0,
  loading: false,
  buttonDisabled: false,
};

RoundCard.propTypes = {
  contractKey: PropTypes.string.isRequired,
  groupSize: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  linkTo: PropTypes.string,
  toPay: PropTypes.func,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  positionToWithdrawPay: PropTypes.number,
  loading: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
};