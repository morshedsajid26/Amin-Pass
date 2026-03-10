"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '@/src/config/api'
import toast from 'react-hot-toast'

const Notification = () => {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Track which row indices are currently being saved
  const [savingRows, setSavingRows] = useState(new Set())

  // ── GET: Fetch notification settings ─────────────────────────────────────
  const fetchNotificationSettings = async () => {
    setLoading(true)
    setError(null)
    try {
      const accessToken = Cookies.get('accessToken')
      const res = await axios.get(
        `${BASE_URL}/business-owner/notification-settings/business-owner`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )
      if (res.data.success) {
        setSettings(res.data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch notification settings', err)
      setError('Failed to load notification settings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotificationSettings()
  }, [])

  // ── POST: Save a single notification setting ──────────────────────────────
  const handleToggle = async (index) => {
    // Prevent double-clicking the same row while saving
    if (savingRows.has(index)) return

    const updatedItem = { ...settings[index], value: !settings[index].value }

    // Optimistic UI update
    setSettings((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    )

    setSavingRows((prev) => new Set(prev).add(index))

    try {
      const accessToken = Cookies.get('accessToken')

      // Build the full updated array (same shape as GET response)
      const updatedSettings = settings.map((item, i) =>
        i === index ? updatedItem : item
      )

      await axios.post(
        `${BASE_URL}/business-owner/notification-settings/business-owner`,
        updatedSettings,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success('Notification settings updated')
    } catch (err) {
      console.error('Failed to update notification setting', err)
      toast.error('Failed to update notification settings')
      // Revert optimistic update on failure
      setSettings((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, value: !updatedItem.value } : item
        )
      )
    } finally {
      setSavingRows((prev) => {
        const next = new Set(prev)
        next.delete(index)
        return next
      })
    }
  }

  const TableHeads = [
    { Title: 'Option',  key: 'option' },
    { Title: 'Channel', key: 'channel' },
    { Title: 'Enable',  key: 'enable' },
  ]

  return (
    <div>
      {loading ? (
        <p className="font-inter text-xl text-[#000000] dark:text-white mt-10">
          Loading notification settings…
        </p>
      ) : error ? (
        <p className="font-inter text-xl text-red-500 mt-10">{error}</p>
      ) : (
        <table className="md:w-[50%] w-full border-collapse overflow-hidden mt-10">
          <thead>
            <tr>
              {TableHeads.map((head, idx) => (
                <th
                  key={idx}
                  className="text-start border-[#000000]/10 dark:border-white/10 font-medium font-inter text-[#000000] dark:text-white py-[22px] text-2xl"
                >
                  {head.Title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {settings.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {/* Option */}
                <td className="border-t border-[#000000]/10 dark:border-white/10 py-[22px] font-inter text-xl text-[#000000] dark:text-white">
                  {row.option}
                </td>

                {/* Channel */}
                <td className="border-t border-[#000000]/10 dark:border-white/10 py-[22px] font-inter text-xl text-[#000000] dark:text-white">
                  {row.channel}
                </td>

                {/* Toggle */}
                <td className="border-t border-[#000000]/10 dark:border-white/10 py-[22px]">
                  <input
                    type="checkbox"
                    checked={row.value}
                    disabled={savingRows.has(rowIdx)}
                    onChange={() => handleToggle(rowIdx)}
                    className={`toggle toggle-white !bg-[#020202] checked:!bg-[#7F56D9] checked:!border-[#7F56D9] ${
                      savingRows.has(rowIdx) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Notification
