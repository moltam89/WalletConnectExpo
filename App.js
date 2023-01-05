// This has to be the first import, otherwise a "WARNING: Missing strong random number source" is thrown
import useWallet from "./useWallet";

import React, { useState, useEffect } from "react";
import { Text , StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import SafeApp from "./SafeApp";


import * as ScreenOrientation from 'expo-screen-orientation';

const { log } = require('./LogHelper');

const { applyDefaultDesign, initDefaultDesign, getDefaultDesignMap, listKeys } = require('./DesignHelper');

const { cleanStorage } = require('./DevHelper');

const { AccountHelper } = require('./AccountHelper');

const { calculatePunkIndex } = require('./WalletHelper');

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

export default function App() {

/* Clean AsyncStorage and SecureStore
    useEffect(() => {
        const clean = async () => {
            await cleanStorage();
        }

        clean();
    }, []);

    return (
      <>
        <Text>Cleaning...</Text>
      </>
    );
*/

    const [activeAccountIndex, setActiveAccountIndex] = useState(null);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);
    const [network, setNetwork] = useState(null);

    let accountHelper = new AccountHelper(activeAccountIndex, setActiveAccountIndex, accountIndexesArray, setAccountIndexesArray, network, setNetwork);

    useEffect(() => {
        accountHelper.handleNetwork();
    }, []);
    useEffect(() => {
        accountHelper.handleActiveAccountIndex();
    }, []);
    useEffect(() => {
        accountHelper.handleAccountIndexesArray();
    }, []);

    const wallet = useWallet(accountHelper);

    const [punkIndex, setPunkIndex] = useState();
    useEffect(() => {
        if (wallet?.address) {
            setPunkIndex(calculatePunkIndex(wallet.address));
        }
    }, [wallet]);

    useEffect(() => {
        async function handleStoredKeys() {
           await initDefaultDesign();
           //await listKeys();

        }

        handleStoredKeys();
    }, []);


    if (!punkIndex) {
        return (
              <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                  <Text>Loading</Text>
              </SafeAreaView>
          
        );
    }

    accountHelper.setWallet(wallet);
    accountHelper.setPunkIndex(punkIndex);

  
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <SafeApp
                    accountHelper={accountHelper}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  fixedRatio: {
    backgroundColor: 'rebeccapurple',
    flex: 1,
    aspectRatio: 1
  },
});

