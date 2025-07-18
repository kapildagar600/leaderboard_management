import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

//Custom dropdown component
export default function UserDropdown({ users, selectedUserId, setSelectedUserId }) {
  const [query, setQuery] = useState('')
  const selectedUser = users.find(user => user._id === selectedUserId) || users[0]

  const filteredUsers = query === ''
    ? users
    : users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <div className="w-full">
      <Combobox
        value={selectedUser}
        onChange={(user) => setSelectedUserId(user._id)}
        by={(a, b) => a._id === b._id}
      >
        <div className="relative">
          <Combobox.Input
            className="w-full rounded border px-3 py-2 text-sm bg-gray-100 shadow-sm focus:ring-blue-500"
            displayValue={(user) => user?.name}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {filteredUsers.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No users found.</div>
            ) : (
              filteredUsers.map((user) => (
                <Combobox.Option
                  key={user._id}
                  value={user}
                  className={({ active }) =>
                    clsx(
                      'cursor-default select-none px-4 py-2 truncate',
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected && 'font-medium')}>
                        {user.name.length > 18 ? user.name.slice(0, 18) + '...' : user.name} – {user.totalPoints} pts
                      </span>
                      {selected && (
                        <span className="absolute right-4 inset-y-0 flex items-center">
                          <CheckIcon className="h-4 w-4 text-white" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}
