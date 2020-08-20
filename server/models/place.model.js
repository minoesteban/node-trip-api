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

            this.places = this.hasMany(models.Purchase, {
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
        locationName: {
            type: Sequelize.STRING,
            field: 'location_name',
            allowNull: true,
        },
        coordinates: {
            type: Sequelize.GEOMETRY(),
            field: 'coordinates',
            allowNull: true,
        },
        fullAudioUrl: {
            type: Sequelize.STRING,
            field: 'full_audio_url',
            allowNull: true,
        },
        previewAudioUrl: {
            type: Sequelize.STRING,
            field: 'preview_audio_url',
            allowNull: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
            field: 'image_url',
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