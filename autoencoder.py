import tensorflow as tf
import data
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from keras.models import Model, load_model
from keras.layers import Input, Dense
from keras.callbacks import ModelCheckpoint, TensorBoard
from keras import regularizers


def trainAutoencoder():
    X_train, X_test = train_test_split(
        data.data, test_size=0.2, random_state=0)

    # Y_train, Y_test = train_test_split(
    #     data.data_y, test_size=0.2, random_state=0)

    input_dim = X_train.shape[1]
    encoding_dim = 14

    input_layer = Input(shape=(input_dim, ))

    encoder = Dense(encoding_dim, activation="tanh",
                    activity_regularizer=regularizers.l1(10e-5))(input_layer)

    encoder = Dense(int(encoding_dim / 2), activation="relu")(encoder)

    decoder = Dense(int(encoding_dim / 2), activation='tanh')(encoder)

    decoder = Dense(input_dim, activation='relu')(decoder)

    autoencoder = Model(inputs=input_layer, outputs=decoder)

    nb_epoch = 100
    autoencoder.compile(optimizer='adam',
                        loss='mean_squared_error',
                        metrics=['accuracy'])

    autoencoder.fit(X_train, X_train, epochs=nb_epoch)

    print("Validation set loss: ", autoencoder.evaluate(
        X_test, X_test, verbose=2)[0])

    print("Bad data loss: ", autoencoder.evaluate(data.badDataPoint_x,
                                                  data.badDataPoint_x, verbose=2)[0])


if __name__ == "__main__":
    trainAutoencoder()
