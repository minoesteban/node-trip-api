'use strict';
const Sequelize = require('sequelize').Sequelize;

module.exports = (sequelize, DataTypes) => {
    class Purchase extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.trip = this.belongsTo(models.Trip, {
                foreignKey: 'trip_id',
            });
            this.user = this.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            this.place = this.belongsTo(models.Place, {
                foreignKey: 'place_id',
            });
        }
    }
    Purchase.init({
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            //es autoincrement en PSQL. no insertar
        },
        tripId: {
            type: Sequelize.INTEGER,
            field: 'trip_id',
            allowNull: false,
            references: {
                model: 'Trip',
                key: 'id',
            },
        },
        placeId: {
            type: Sequelize.INTEGER,
            field: 'place_id',
            allowNull: false,
            references: {
                model: 'Place',
                key: 'id',
            },
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id',
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    }, {
        sequelize,
        schema: 'public',
        tableName: 'purchase',
        modelName: 'Purchase',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
    });
    return Purchase;
};