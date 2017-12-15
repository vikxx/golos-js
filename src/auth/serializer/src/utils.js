
export function getIdbyName(op, ver) {
    const isV17 = ver === '0.17'
    switch(op) {
      case 'vote': return isV17 ? 40 : 0
      case 'comment': return isV17 ? 41 : 1
      case 'transfer': return isV17 ? 42 : 2
      case 'transfer_to_vesting': return isV17 ? 43 : 3
      case 'withdraw_vesting': return isV17 ? 44 : 4
      case 'limit_order_create': return  isV17 ? 45 : 5
      case 'limit_order_cancel': return isV17 ? 46 : 6
      case 'feed_publish': return isV17 ? 47 : 7
      case 'convert': return isV17 ? 48 : 8
      case 'account_create': return isV17 ? 49 : 9
      case 'account_update': return isV17 ? 50 : 10
      case 'witness_update': return isV17 ? 51 : 11
      case 'account_witness_vote': return  isV17 ? 52 : 12
      case 'account_witness_proxy': return  isV17 ? 53 : 13
      case 'pow': return isV17 ? 54 : 14
      case 'custom': return  15
      case 'report_over_production': return isV17 ? 55 : 16
      case 'delete_comment': return isV17 ? 56 : 17
      case 'custom_json': return  18
      case 'comment_options': return isV17 ? 57 : 19
      case 'set_withdraw_vesting_route': return isV17 ? 58 : 20
      case 'limit_order_create2': return isV17 ? 59 : 21
      case 'challenge_authority': return isV17 ? 60 : 22
      case 'prove_authority': return isV17 ? 61 : 23
      case 'request_account_recovery': return  isV17 ? 62 : 24
      case 'recover_account': return isV17 ? 63 : 25
      case 'change_recovery_account': return isV17 ? 64 : 26
      case 'escrow_transfer': return isV17 ? 65 : 27
      case 'escrow_dispute': return isV17 ? 66 : 28
      case 'escrow_release': return isV17 ? 67 : 29
      case 'pow2': return isV17 ? 68 : 30
      case 'escrow_approve': return isV17 ? 69 : 31
      case 'transfer_to_savings': isV17 ? 70 : 32
      case 'transfer_from_savings': return isV17 ? 71 : 33
      case 'cancel_transfer_from_savings': return isV17 ? 72 : 34
      case 'custom_binary': return 35
      case 'decline_voting_rights': return isV17 ? 73 : 36
      case 'reset_account': return isV17 ? 74 : 37
      case 'set_reset_account': return isV17 ? 75 : 38
      case 'comment_benefactor_reward': return isV17 ? 76 : 39
      case 'delegate_vesting_shares':  77
      case 'account_create_with_delegation': return 78
      case 'asset_create': return 79
      case 'asset_update': return 80
      case 'asset_update_bitasset': return 81
      case 'asset_update_feed_producers': return 82
      case 'asset_issue': return 83
      case 'asset_reserve': return 84
      case 'asset_fund_fee_pool': return 85
      case 'asset_settle': return 86
      case 'asset_force_settle': return 87
      case 'asset_global_settle': return 88
      case 'asset_publish_feed': return 89
      case 'asset_claim_fees': return 90
      case 'call_order_update': return 91
      case 'account_whitelist': return 92
      case 'override_transfer': return 93
      case 'proposal_create': return 94
      case 'proposal_update': return 95
      case 'proposal_delete': return 96
      case 'bid_collateral': return 97
      case 'fill_convert_request': return isV17 ? 110 : 98
      case 'author_reward': return isV17 ? 111 : 99
      case 'curation_reward': return isV17 ? 112 : 100
      case 'comment_reward': return isV17 ? 113 : 101
      case 'liquidity_reward': return isV17 ? 114 : 102
      case 'interest': return isV17 ? 115 : 103
      case 'fill_vesting_withdraw': return isV17 ? 116 : 104
      case 'fill_order': return isV17 ? 117 : 105
      case 'shutdown_witness': return isV17 ? 118 : 106
      case 'fill_transfer_from_savings': return isV17 ? 119 : 107
      case 'hardfork': return isV17 ? 120 : 108
      case 'comment_payout_update': return isV17 ? 121 : 109
      case 'return_vesting_delegation': return 122
      case 'asset_settle_cancel': return 123
      case 'fill_call_order': return 124
      case 'fill_settlement_order': return 125
      case 'execute_bid': return 126
      case 'expire_witness_vote': return 127
    }
  }
