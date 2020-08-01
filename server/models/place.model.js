'use strict';
const Sequelize = require('sequelize').Sequelize;

module.exports = (sequelize, DataTypes) => {
    class Place extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.parentTrip = this.belongsTo(models.Trip, {
                foreignKey: 'trip_id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            });

            this.ratings = this.hasMany(models.Rating, {
                foreignKey: 'place_id',
            });
        }
    }
    Place.init({
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
        },
        googlePlaceId: {
            type: Sequelize.STRING,
            field: 'google_place_id',
            allowNull: true,
        },
        coordinates: {
            type: Sequelize.GEOMETRY(),
            field: 'coordinates',
            allowNull: true,
        },
        audioUrl: {
            type: Sequelize.STRING,
            field: 'audio_url',
            allowNull: true,
        },
        audioPreviewUrl: {
            type: Sequelize.STRING,
            field: 'audio_preview_url',
            allowNull: true,
        },
        pictureUrl1: {
            type: Sequelize.STRING,
            field: 'picture_url_1',
            allowNull: true,
        },
        pictureUrl2: {
            type: Sequelize.STRING,
            field: 'picture_url_2',
            allowNull: true,
        },
        price: {
            type: Sequelize.FLOAT(53),
            field: 'price',
            allowNull: true,
            defaultValue: 0,
        },
        order: {
            type: Sequelize.INTEGER,
            field: 'order',
            allowNull: true,
        },
        about: {
            type: Sequelize.STRING,
            field: 'about',
            allowNull: true,
        },
        tripId: {
            type: Sequelize.INTEGER,
            field: 'trip_id',
            allowNull: false,
            references: {
                model: 'Trip',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    }, {
        sequelize,
        schema: 'public',
        tableName: 'place',
        modelName: 'Place',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
    });
    return Place;
};