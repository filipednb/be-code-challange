import * as express from 'express';
import OrganizationController from '../../../src/domain/organization/organization.controller';

jest.mock('tslog', () => ({
  Logger: () => ({
    log: jest.fn()
  })
}))

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

describe('OrganizationController', () => {
  let instance: OrganizationController;

  beforeEach(() => {
    instance = new OrganizationController();
  });

  it('instance should be an instanceof OrganizationController', () => {
    expect(instance instanceof OrganizationController).toBeTruthy();
  });

  it('should have a method intializeRoutes()', () => {
    instance.intializeRoutes();
  });

  it('should create a new organization', () => {
    const req = {
      body: {
        type: "ORGANIZATION",
        id: "3af24ac6-fc27-498d-8c5b-012ca93d830b",
        code: "FAM"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(), send: jest.fn()
    };
    instance.insertOrUpdate(req as express.Request, res as unknown as express.Response);
    
    expect(res.send).toBeCalledWith({"aa": "aa"});
  });
});

// const retrieveMember = require('./retrieveMember');
// const MemberService = require('./MemberService');

// describe('61834610', () => {
//   it('should throw 400 error if id is empty string', async () => {
//     const mReq = { params: { id: '' } };
//     const mRes = {};
//     const mNext = jest.fn();
//     await retrieveMember(mReq, mRes, mNext);
//     expect(mNext).toBeCalledWith(new Error('invalid.'));
//   });

//   it('should throw 400 error if id is undefined', async () => {
//     const mReq = { params: {} };
//     const mRes = {};
//     const mNext = jest.fn();
//     await retrieveMember(mReq, mRes, mNext);
//     expect(mNext).toBeCalledWith(new Error('invalid.'));
//   });

//   it('should throw 400 error if id is invalid format', async () => {
//     const mReq = { params: { id: '$$' } };
//     const mRes = {};
//     const mNext = jest.fn();
//     await retrieveMember(mReq, mRes, mNext);
//     expect(mNext).toBeCalledWith(new Error('invalid format.'));
//   });

//   it('should retrieve one member by id and send response correctly', async () => {
//     const mMemberRecord = { id: '1', username: 'KF1' };
//     jest.spyOn(MemberService, 'retrieveOneMember').mockResolvedValueOnce(mMemberRecord);
//     const mReq = { params: { id: '1' } };
//     const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
//     const mNext = jest.fn();
//     await retrieveMember(mReq, mRes, mNext);
//     expect(MemberService.retrieveOneMember).toBeCalledWith('1');
//     expect(mRes.status).toBeCalledWith(200);
//     expect(mRes.send).toBeCalledWith({ member_detail: { id: '1', username: 'KF1' } });
//   });