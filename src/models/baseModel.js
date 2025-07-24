const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');

const IST_TIMEZONE = 'Asia/Kolkata';

function istTimestamps(fields = {}) {
  return {
    ...fields,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const val = this.getDataValue('createdAt');
        return val ? moment(val).tz(IST_TIMEZONE).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const val = this.getDataValue('updatedAt');
        return val ? moment(val).tz(IST_TIMEZONE).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    }
  };
}

module.exports = istTimestamps;