import { useMemo } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWeb3React } from '@web3-react/core'
import { DhubContract } from '@config/artifacts/DhubContract'
import Web3 from 'web3'

const { address, abi } = DhubContract

export const useContract = (): Contract => {
  const { active, library, chainId } = useWeb3React()

  const DhubContract = useMemo(() => {
    if (active) {
      const contract = new (library as Web3).eth.Contract(abi, address[chainId as number])

      return contract
    }
  }, [active, library, chainId])

  return DhubContract as Contract
}