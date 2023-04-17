import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import MonographForm from '~/components/monographs/monograph.form'

const RegisterNewMonographPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
  })

  const student = await ssg.student.byUser.fetch()

  return (
    <div className='app-grid app-items-start app-gap-8 app-max-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-text-2xl app-font-bold app-tracking-wide app-text-slate-900'>
            Registro de monografías
          </h1>
        </div>
      </div>

      <MonographForm
        defaultValues={{
          authorId: student?.id ?? undefined,
        }}
      />
    </div>
  )
}

export default RegisterNewMonographPage
